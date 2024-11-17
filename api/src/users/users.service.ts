import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException, NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Status, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'passwordHash'> | undefined> {
    let user;

    try {
      user = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          passwordHash: await this.hashPassword(createUserDto.password),
          name: createUserDto.name,
          surname: createUserDto.surname,
        },
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('email is already in use');
        }
      } else {
        throw new InternalServerErrorException(
          'unknown error while adding user to db',
        );
      }
    }

    return user;
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'passwordHash'>> {
    const passwordHash = updateUserDto.password
      ? await this.hashPassword(updateUserDto.password)
      : undefined;
    const emailExists =
      updateUserDto.email &&
      (await this.prisma.user.findFirst({
        where: { email: updateUserDto.email },
      }));

    if (emailExists) {
      throw new ConflictException('email is already in use');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
        email: updateUserDto.email,
        name: updateUserDto.name,
        surname: updateUserDto.surname,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
      },
    });
  }

  async delete(userId: number): Promise<Omit<User, 'passwordHash'>> {
    // todo: what to do with projects/tasks? maybe soft-delete?

    return this.prisma.user.delete({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
      },
    });
  }

  async findOneOnlyPasswordHashAndId(
    email: string,
  ): Promise<{ passwordHash: string; id: number } | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });
  }

  async findOne(id: number): Promise<Omit<User, 'passwordHash'> | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
      },
    });
  }

  async getPendingTasks(id: number) {
    return this.prisma.task.findMany({
      where: { assignedToUserId: id, status: { not: Status.done } },
      select: {
        id: true,
        name: true,
        project: {
          select: {
            id: true,
            name: true,
          },
        },
        status: true,
        priority: true,
        size: true,
        createdAt: true,
        expectedDoneAt: true,
      },
      orderBy: [{ expectedDoneAt: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async getProjects(id: number) {
    return this.prisma.userProject.findMany({
      where: { userId: id },
      select: { project: { select: { id: true, name: true } }, role: true },
    });
  }

  async getInvites(id: number) {
    return this.prisma.projectInvite.findMany({
      where: { userId: id },
      select: {
        id: true,
        project: { select: { id: true, name: true } },
        role: true,
      },
    });
  }

  async acceptInvite(inviteId: number, userId: number) {
    const invite = await this.prisma.projectInvite.findUnique({
      where: { id: inviteId },
    });
    if (!invite) {
      throw new NotFoundException('no such invite');
    }

    if (invite.userId !== userId) {
      throw new UnauthorizedException(
        "user don't have permissions to accept this invite",
      );
    }

    return this.prisma.$transaction(async () => {
      await this.prisma.userProject.create({
        data: {
          userId: invite.userId,
          projectId: invite.projectId,
          role: invite.role,
        },
      });

      await this.prisma.projectInvite.delete({ where: { id: invite.id } });

      return this.prisma.project.findUnique({
        where: { id: invite.projectId },
        select: { id: true, name: true },
      });
    });
  }

  async rejectInvite(inviteId: number, userId: number) {
    const invite = await this.prisma.projectInvite.findUnique({
      where: { id: inviteId },
    });
    if (!invite) {
      throw new BadRequestException('no such invite');
    }

    if (invite.userId !== userId) {
      throw new UnauthorizedException('not enough permissions');
    }

    return this.prisma.projectInvite.delete({
      where: { id: inviteId },
      select: {
        id: true,
        project: { select: { id: true, name: true } },
        role: true,
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
