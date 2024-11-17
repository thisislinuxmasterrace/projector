import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/createProject.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { CreateInviteDto } from './dto/createInvite.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, userId: number) {
    return this.prisma.$transaction(async () => {
      const project = await this.prisma.project.create({
        data: { name: createProjectDto.name },
        select: { id: true, name: true },
      });

      await this.prisma.userProject.create({
        data: { projectId: project.id, userId, role: 'owner' },
      });

      return project;
    });
  }

  async update(
    projectId: number,
    updateProjectDto: UpdateProjectDto,
    userId: number,
  ) {
    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
        role: 'owner',
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.project.update({
      where: { id: projectId },
      data: { name: updateProjectDto.name },
      select: { id: true, name: true },
    });
  }

  async read(projectId: number, userId: number) {
    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.project.findUnique({
      where: { id: projectId },
      select: { id: true, name: true },
    });
  }

  async delete(projectId: number, userId: number) {
    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
        role: 'owner',
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.$transaction(async () => {
      await this.prisma.comment.deleteMany({
        where: { projectId },
      });
      await this.prisma.task.deleteMany({
        where: { projectId },
      });
      await this.prisma.userProject.deleteMany({
        where: { projectId },
      });
      await this.prisma.projectInvite.deleteMany({
        where: { projectId },
      });
      return this.prisma.project.delete({
        where: { id: projectId },
        select: { id: true, name: true },
      });
    });
  }

  async createInvite(projectId: number, createInviteDto: CreateInviteDto, userId: number) {
    if (
      createInviteDto.role !== 'owner' &&
      createInviteDto.role !== 'maintainer'
    ) {
      throw new BadRequestException('invalid role');
    }

    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
        role: 'owner',
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    const invitedUser = await this.prisma.user.findUnique({
      where: { email: createInviteDto.email },
    });

    if (!invitedUser) {
      throw new NotFoundException('no such user');
    }

    const existingInvite = await this.prisma.projectInvite.findFirst({
      where: { projectId: userProject.projectId, userId: invitedUser.id },
    });

    if (existingInvite) {
      throw new BadRequestException('invite already exists');
    }

    const userInProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId: invitedUser.id,
          projectId,
        },
      },
    });

    if (userInProject) {
      throw new BadRequestException('user is already in project');
    }

    return this.prisma.projectInvite.create({
      data: {
        projectId,
        userId: invitedUser.id,
        role: createInviteDto.role,
      },
      select: {
        id: true,
        project: { select: { id: true, name: true } },
        user: { select: { email: true } },
        role: true,
      },
    });
  }

  async getTasks(userId: number, projectId: number) {
    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.task.findMany({
      where: { projectId },
      select: {
        id: true,
        name: true,
        status: true,
        priority: true,
        size: true,
        expectedDoneAt: true,
        assignedToUser: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
      },
    });
  }

  async getUsers(userId: number, projectId: number) {
    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.userProject.findMany({
      where: { projectId },
      select: {
        user: { select: { id: true, name: true, surname: true, email: true } },
        role: true,
      },
    });
  }

  async getInvites(userId: number, projectId: number) {
    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
        role: 'owner',
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.projectInvite.findMany({
      where: { projectId },
      select: {
        id: true,
        user: { select: { email: true } },
        role: true,
      },
    });
  }

  async deleteUserFromProject(
    userId: number,
    projectId: number,
    initiatorId: number,
  ) {
    if (userId !== initiatorId) {
      const userProject = await this.prisma.userProject.findUnique({
        where: {
          userId_projectId: {
            userId: initiatorId,
            projectId,
          },
          role: 'owner',
        },
      });

      if (!userProject) {
        throw new UnauthorizedException('not enough permissions');
      }
    }

    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
        role: true,
      },
    });

    if (!userProject) {
      throw new BadRequestException('no such user in project');
    }

    await this.prisma.$transaction([
      this.prisma.task.updateMany({
        where: { projectId, assignedToUserId: userId },
        data: { assignedToUserId: null },
      }),
      this.prisma.userProject.delete({
        where: { userId_projectId: { userId, projectId } },
      }),
    ]);

    return userProject;
  }
}
