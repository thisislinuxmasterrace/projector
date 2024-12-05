import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
      select: {
        id: true,
        name: true,
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        description: true,
        status: true,
        priority: true,
        size: true,
        createdAt: true,
        updatedAt: true,
        expectedDoneAt: true,
        doneAt: true,
        assignedToUser: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
        comments: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                surname: true,
                email: true,
              },
            },
            createdAt: true,
            updatedAt: true,
            content: true,
          },
        },
      },
    });
  }

  async update(taskId: number, updateTaskDto: UpdateTaskDto, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      throw new NotFoundException('no such task');
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
      data: { ...updateTaskDto, doneAt, updatedAt: new Date().toISOString() },
      select: {
        id: true,
        name: true,
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        description: true,
        status: true,
        priority: true,
        size: true,
        createdAt: true,
        updatedAt: true,
        expectedDoneAt: true,
        doneAt: true,
        assignedToUser: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
        comments: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                surname: true,
                email: true,
              },
            },
            createdAt: true,
            updatedAt: true,
            content: true,
          },
        },
      },
    });
  }

  async delete(taskId: number, userId: number) {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      throw new NotFoundException('no such task');
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
      const taskWithComments = await this.prisma.task.findUnique({
        where: { id: taskId },
        select: {
          id: true,
          name: true,
          project: {
            select: {
              id: true,
              name: true,
            },
          },
          description: true,
          status: true,
          priority: true,
          size: true,
          createdAt: true,
          updatedAt: true,
          expectedDoneAt: true,
          doneAt: true,
          assignedToUser: {
            select: {
              id: true,
              name: true,
              surname: true,
              email: true,
            },
          },
          comments: {
            select: {
              id: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
              createdAt: true,
              updatedAt: true,
              content: true,
            },
          },
        },
      });

      await this.prisma.comment.deleteMany({ where: { taskId } });

      await this.prisma.task.delete({
        where: { id: taskId },
        select: {
          id: true,
          name: true,
          project: {
            select: {
              id: true,
              name: true,
            },
          },
          description: true,
          status: true,
          priority: true,
          size: true,
          createdAt: true,
          updatedAt: true,
          expectedDoneAt: true,
          doneAt: true,
          assignedToUser: {
            select: {
              id: true,
              name: true,
              surname: true,
              email: true,
            },
          },
          comments: {
            select: {
              id: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  surname: true,
                  email: true,
                },
              },
              createdAt: true,
              updatedAt: true,
              content: true,
            },
          },
        },
      });

      return taskWithComments;
    });
  }

  async get(taskId: number, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      select: {
        id: true,
        name: true,
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        description: true,
        status: true,
        priority: true,
        size: true,
        createdAt: true,
        updatedAt: true,
        expectedDoneAt: true,
        doneAt: true,
        assignedToUser: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
        comments: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                name: true,
                surname: true,
                email: true,
              },
            },
            createdAt: true,
            updatedAt: true,
            content: true,
          },
        },
      },
    });

    if (!task) {
      throw new NotFoundException('no such task');
    }

    const membership = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: task.project.id,
        },
      },
    });

    if (!membership) {
      throw new UnauthorizedException('not enough permissions');
    }

    return task;
  }
}
