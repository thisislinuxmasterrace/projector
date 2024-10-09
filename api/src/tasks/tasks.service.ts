import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/createTask.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: number) {
    const membership = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: createTaskDto.projectId,
        },
      },
    });

    if (!membership) {
      throw new UnauthorizedException('not enough permissions');
    }

    if (createTaskDto.assignedToUserId !== undefined) {
      const user = await this.prisma.userProject.findUnique({
        where: {
          userId_projectId: {
            projectId: createTaskDto.projectId,
            userId: createTaskDto.assignedToUserId,
          },
        },
      });

      if (!user) {
        throw new BadRequestException('no such user in project');
      }
    }

    let doneAt: string | undefined = undefined;
    if (createTaskDto.status === 'done') {
      doneAt = new Date().toISOString();
    }

    return this.prisma.task.create({
      data: { ...createTaskDto, doneAt },
      include: {
        assignedToUser: { omit: { passwordHash: true } },
        comments: {
          include: { user: { omit: { passwordHash: true } } },
          omit: { userId: true, projectId: true, taskId: true },
        },
      },
    });
  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      throw new BadRequestException('no such task');
    }

    const membership = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task.projectId,
        },
      },
    });

    if (!membership) {
      throw new UnauthorizedException('not enough permissions');
    }

    if (updateTaskDto.assignedToUserId) {
      const user = await this.prisma.userProject.findUnique({
        where: {
          userId_projectId: {
            projectId: task.projectId,
            userId: updateTaskDto.assignedToUserId,
          },
        },
      });

      if (!user) {
        throw new BadRequestException('no such user in project');
      }
    }

    let doneAt: string | undefined = undefined;
    if (updateTaskDto.status === 'done' && task.doneAt === null) {
      doneAt = new Date().toISOString();
    }

    return this.prisma.task.update({
      where: { id: task.id },
      data: { ...updateTaskDto, doneAt },
      include: {
        assignedToUser: { omit: { passwordHash: true } },
        comments: {
          include: { user: { omit: { passwordHash: true } } },
          omit: { userId: true, projectId: true, taskId: true },
        },
      },
    });
  }

  async delete(taskId: number, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      throw new BadRequestException('no such task');
    }

    const membership = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task.projectId,
        },
      },
    });

    if (!membership) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.$transaction(async () => {
      await this.prisma.comment.deleteMany({ where: { taskId } });

      return this.prisma.task.delete({ where: { id: taskId } });
    });
  }

  async get(taskId: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        assignedToUser: { omit: { passwordHash: true } },
        comments: {
          include: { user: { omit: { passwordHash: true } } },
          omit: { userId: true, projectId: true, taskId: true },
        },
        project: true,
      },
    });

    if (!task) {
      throw new BadRequestException('no such task');
    }

    const membership = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task.projectId,
        },
      },
    });

    if (!membership) {
      throw new UnauthorizedException('not enough permissions');
    }

    return task;
  }
}
