import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
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
        omit: {
          passwordHash: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('email is already in use');
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
      throw new BadRequestException('email is already in use');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash,
        email: updateUserDto.email,
        name: updateUserDto.name,
        surname: updateUserDto.surname,
      },
      omit: {
        passwordHash: true,
      },
    });
  }

  async delete(userId: number): Promise<Omit<User, 'passwordHash'>> {
    // todo: what to do with projects/tasks? maybe soft-delete?

    return this.prisma.user.delete({
      where: { id: userId },
      omit: { passwordHash: true },
    });
  }

  async findOneWithPasswordHash(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOne(id: number): Promise<Omit<User, 'passwordHash'> | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        invites: {
          include: { project: true },
          omit: { userId: true, projectId: true },
        },
        projects: {
          include: { project: true },
          omit: { userId: true, projectId: true },
        },
        tasks: true,
      },
      omit: { passwordHash: true },
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
