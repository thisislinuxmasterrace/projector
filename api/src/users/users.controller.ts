import {
  Body,
  Controller, Delete,
  Get, HttpCode,
  HttpStatus, Param, ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { HasJwt } from '../types/HasJwt';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 2,
      name: 'Kirill',
      surname: 'Belolipetsky',
      email: 'kirillbelolipetsky@gmail.com',
    },
  })
  @Get('me')
  @ApiOperation({ summary: 'Get info about currently authorized user.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() req: HasJwt) {
    return this.usersService.findOne(req.user.sub);
  }

  @Get('me/projects')
  @ApiOperation({ summary: 'Get projects that current user is on.' })
  @ApiResponse({
    status: HttpStatus.OK,
    example: [
      {
        project: {
          id: 4,
          name: 'Projector',
        },
        role: 'owner',
      },
      {
        project: {
          id: 8,
          name: 'NestJS',
        },
        role: 'maintainer',
      },
    ],
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getCurrentUserProjects(@Req() req: HasJwt) {
    return this.usersService.getProjects(req.user.sub);
  }

  @Get('me/pending-tasks')
  @ApiResponse({
    status: HttpStatus.OK,
    example: [
      {
        id: 15,
        name: 'Main page',
        project: {
          id: 4,
          name: 'Projector',
        },
        status: 'inProgress',
        priority: 'medium',
        size: 'xl',
        createdAt: '2024-11-15T19:01:31.577Z',
        expectedDoneAt: '2024-11-15T18:58:44.000Z',
      },
      {
        id: 17,
        name: 'User login page',
        project: {
          id: 4,
          name: 'Projector',
        },
        status: 'todo',
        priority: 'none',
        size: 'none',
        createdAt: '2024-11-15T19:01:36.658Z',
        expectedDoneAt: null,
      },
    ],
  })
  @ApiOperation({
    summary:
      'Get pending tasks assigned to user. Sorted by expectedDoneAt (ascending) and createdAt (descending).',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getCurrentUserPendingTasks(@Req() req: HasJwt) {
    return this.usersService.getPendingTasks(req.user.sub);
  }

  @Get('me/invites')
  @ApiResponse({
    status: HttpStatus.OK,
    example: [
      {
        id: 2,
        project: {
          id: 6,
          name: 'Projector',
        },
        role: 'owner',
      },
      {
        id: 3,
        project: {
          id: 4,
          name: 'NestJS',
        },
        role: 'maintainer',
      },
    ],
  })
  @ApiOperation({ summary: 'Get invites to projects for current user.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getCurrentUserInvites(@Req() req: HasJwt) {
    return this.usersService.getInvites(req.user.sub);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 2,
      name: 'Kirill',
      surname: 'Belolipetsky',
      email: 'kirillbelolipetsky@gmail.com',
    },
  })
  @Patch('me')
  @ApiOperation({ summary: 'Update currently authorized user.' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @Req() req: HasJwt,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.sub, updateUserDto);
  }

  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   example: {
  //     id: 2,
  //     email: 'archhaze@hotmail.lol',
  //     name: 'Dmitry',
  //     surname: 'Bel',
  //   },
  // })
  // @Delete('me')
  // @ApiOperation({ summary: 'delete currently authorized user' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // async deleteCurrentUser(@Req() req: HasJwt) {
  //   return this.usersService.delete(req.user.sub);
  // }

  @ApiResponse({
    status: HttpStatus.CREATED,
    example: {
      id: 2,
      name: 'Kirill',
      surname: 'Belolipetsky',
      email: 'kirillbelolipetsky@gmail.com',
    },
  })
  @Post()
  @ApiOperation({ summary: 'Creates a new user.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('me/invites/:id/accept')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 8,
      project: {
        id: 9,
        name: 'Projector',
      },
      user: {
        email: 'kirillbelolipetsky@gmail.com',
      },
      role: 'maintainer',
    },
  })
  @ApiOperation({ summary: 'Accept invite to project.' })
  async acceptInvite(
    @Param('id', ParseIntPipe) inviteId: number,
    @Req() req: HasJwt,
  ) {
    return this.usersService.acceptInvite(inviteId, req.user.sub);
  }

  @Delete('me/invites/:id/reject')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 4,
      project: {
        id: 6,
        name: 'Projector',
      },
      role: 'owner',
    },
  })
  @ApiOperation({ summary: 'Reject invite to project.' })
  async rejectInvite(
    @Param('id', ParseIntPipe) inviteId: number,
    @Req() req: HasJwt,
  ) {
    return this.usersService.rejectInvite(inviteId, req.user.sub);
  }
}
