import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/createComment.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const task = await this.prisma.task.findUnique({
      where: { id: createCommentDto.taskId },
    });

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

    return this.prisma.comment.create({
      data: { ...createCommentDto, projectId: task.projectId, userId },
      select: {
        id: true,
        content: true,
        taskId: true,
        projectId: true,
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
      },
    });
  }

  async update(
    commentId: number,
    updateCommentDto: UpdateCommentDto,
    userId: number,
  ) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('no such comment');
    }

    const membership = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: comment.projectId,
        },
      },
    });

    if (!membership) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { ...updateCommentDto, updatedAt: new Date().toISOString() },
      select: {
        id: true,
        content: true,
        taskId: true,
        projectId: true,
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
      },
    });
  }

  async delete(commentId: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('no such comment');
    }

    const membership = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: comment.projectId,
        },
      },
    });

    if (!membership) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.comment.delete({
      where: { id: commentId },
      select: {
        id: true,
        content: true,
        taskId: true,
        projectId: true,
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
      },
    });
  }

  async get(commentId: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
      select: {
        id: true,
        content: true,
        taskId: true,
        projectId: true,
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
      },
    });

    if (!comment) {
      throw new NotFoundException('no such comment');
    }

    const membership = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: comment.projectId,
        },
      },
    });

    if (!membership) {
      throw new UnauthorizedException('not enough permissions');
    }

    return comment;
  }
}
