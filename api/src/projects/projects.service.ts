import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProjectDto } from './dto/createProject.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { ReadProjectDto } from './dto/readProject.dto';
import { DeleteProjectDto } from './dto/deleteProject.dto';
import { CreateInviteDto } from './dto/createInvite.dto';
import { AcceptInviteDto } from './dto/acceptInvite.dto';
import { RejectInviteDto } from './dto/rejectInvite.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {
  }

  async create(createProjectDto: CreateProjectDto, userId: number) {
    // noinspection JSUnusedLocalSymbols
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id: userId },
    });

    return this.prisma.$transaction(async () => {
      const project = await this.prisma.project.create({
        data: { name: createProjectDto.name },
      });

      await this.prisma.userProject.create({ data: { projectId: project.id, userId, role: 'owner' } });

      return this.prisma.project.findUnique({
        where: { id: project.id },
        include: {
          users: {
            include: {
              user: { omit: { passwordHash: true } },
            },
            omit: { userId: true, projectId: true },
          },
          invites: { omit: { projectId: true }, include: { user: { omit: { passwordHash: true } } } },
        },
      });
    });
  }

  async update(updateProjectDto: UpdateProjectDto, userId: number) {
    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: updateProjectDto.id,
        },
        role: 'owner',
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.project.update({
      where: { id: updateProjectDto.id },
      data: { name: updateProjectDto.name },
      include: {
        users: {
          include: {
            user: { omit: { passwordHash: true } },
          },
          omit: { userId: true, projectId: true },
        },
        invites: { omit: { projectId: true }, include: { user: { omit: { passwordHash: true } } } },
      },
    });
  }

  async read(readProjectDto: ReadProjectDto, userId: number) {
    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: readProjectDto.id,
        },
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.project.findUnique({
      where: { id: readProjectDto.id },
      include: {
        users: {
          include: {
            user: { omit: { passwordHash: true } },
          },
          omit: { userId: true, projectId: true },
        },
        invites: { omit: { projectId: true }, include: { user: { omit: { passwordHash: true } } } },
      },
    });
  }

  async delete(deleteProjectDto: DeleteProjectDto, userId: number) {
    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: deleteProjectDto.id,
        },
        role: 'owner',
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.$transaction(async () => {
      await this.prisma.comment.deleteMany({ where: { projectId: deleteProjectDto.id } });
      await this.prisma.task.deleteMany({ where: { projectId: deleteProjectDto.id } });
      await this.prisma.userProject.deleteMany({ where: { projectId: deleteProjectDto.id } });
      await this.prisma.projectInvite.deleteMany({ where: { projectId: deleteProjectDto.id } });
      return this.prisma.project.delete({ where: { id: deleteProjectDto.id } });
    });
  }

  async createInvite(createInviteDto: CreateInviteDto, userId: number) {
    if (createInviteDto.role !== 'owner' && createInviteDto.role !== 'maintainer') {
      throw new BadRequestException('invalid role');
    }

    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: createInviteDto.projectId,
        },
        role: 'owner',
      },
    });

    if (!userProject) {
      throw new UnauthorizedException('not enough permissions');
    }

    const invitedUser = await this.prisma.user.findUnique({ where: { email: createInviteDto.email } });

    if (!invitedUser) {
      throw new BadRequestException('no such user');
    }

    return this.prisma.projectInvite.create({
      data: {
        projectId: createInviteDto.projectId,
        userId: invitedUser.id,
        role: createInviteDto.role,
      },
    });
  }

  async acceptInvite(acceptInviteDto: AcceptInviteDto, userId: number) {
    const invite = await this.prisma.projectInvite.findUnique({ where: { id: acceptInviteDto.inviteId } });
    if (!invite) {
      throw new BadRequestException('no such invite')
    }

    if (invite.userId !== userId) {
      throw new UnauthorizedException('invite not found or user don\'t have permissions to accept it');
    }

    return this.prisma.$transaction(async () => {
      await this.prisma.userProject.create({
        data: {
          userId: invite.userId,
          projectId: invite.projectId,
          role: invite.role
        },
      });

      await this.prisma.projectInvite.delete({where: { id: invite.id}})

      return this.prisma.project.findUnique({
        where: { id: invite.id },
        include: {
          users: {
            include: {
              user: { omit: { passwordHash: true } },
            },
            omit: { userId: true, projectId: true },
          },
          invites: { omit: { projectId: true }, include: { user: { omit: { passwordHash: true } } } },
        },
      });
    });
  }

  async rejectInvite(rejectInviteDto: RejectInviteDto, userId: number) {
    const invite = await this.prisma.projectInvite.findUnique({ where: { id: rejectInviteDto.inviteId } });
    if (!invite) {
      throw new BadRequestException('no such invite')
    }

    if (invite.userId !== userId) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.projectInvite.delete({where: { id: rejectInviteDto.inviteId }});
  }
}
