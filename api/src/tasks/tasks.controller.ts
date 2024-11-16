import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from './dto/createTask.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { HasJwt } from '../types/HasJwt';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new task.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    example: {
      id: 20,
      name: 'Delete our production db',
      project: {
        id: 6,
        name: 'Projector',
      },
      description:
        'So our production db is basically useless at this point, we should get rid of it.',
      status: 'inProgress',
      priority: 'high',
      size: 'xs',
      createdAt: '2024-11-15T20:19:34.069Z',
      updatedAt: null,
      expectedDoneAt: '2024-11-17T20:19:34.069Z',
      doneAt: null,
      assignedToUser: null,
      comments: [],
    },
  })
  async create(@Body() createTaskDto: CreateTaskDto, @Req() req: HasJwt) {
    return this.tasksService.create(createTaskDto, req.user.sub);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a task.' })
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 20,
      name: 'Delete our production db',
      project: {
        id: 6,
        name: 'Projector',
      },
      description:
        'So our production db is basically useless at this point, we should get rid of it.',
      status: 'done',
      priority: 'high',
      size: 'xs',
      createdAt: '2024-11-15T20:19:34.069Z',
      updatedAt: '2024-11-16T20:19:34.069Z',
      expectedDoneAt: '2024-11-17T20:19:34.069Z',
      doneAt: '2024-11-16T18:19:34.069Z',
      assignedToUser: {
        id: 3,
        name: 'Kirill',
        surname: 'Belolipetsky',
        email: 'kirill@gmail.com',
      },
      comments: [
        {
          id: 1,
          user: {
            id: 3,
            name: 'Artem',
            surname: 'Lukichev',
            email: 'artem@gmail.com',
          },
          createdAt: '2024-11-16T00:50:49.951Z',
          updatedAt: null,
          content: "I really don't think we should do that...",
        },
      ],
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: HasJwt,
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a task (with all comments).' })
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 20,
      name: 'Delete our production db',
      project: {
        id: 6,
        name: 'Projector',
      },
      description:
        'So our production db is basically useless at this point, we should get rid of it.',
      status: 'done',
      priority: 'high',
      size: 'xs',
      createdAt: '2024-11-15T20:19:34.069Z',
      updatedAt: '2024-11-16T20:19:34.069Z',
      expectedDoneAt: '2024-11-17T20:19:34.069Z',
      doneAt: '2024-11-16T18:19:34.069Z',
      assignedToUser: {
        id: 3,
        name: 'Kirill',
        surname: 'Belolipetsky',
        email: 'kirill@gmail.com',
      },
      comments: [
        {
          id: 1,
          user: {
            id: 3,
            name: 'Artem',
            surname: 'Lukichev',
            email: 'artem@gmail.com',
          },
          createdAt: '2024-11-16T00:50:49.951Z',
          updatedAt: null,
          content: "I really don't think we should do that...",
        },
      ],
    },
  })
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: HasJwt) {
    return this.tasksService.delete(id, req.user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a task (with all comments).' })
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 20,
      name: 'Delete our production db',
      project: {
        id: 6,
        name: 'Projector',
      },
      description:
        'So our production db is basically useless at this point, we should get rid of it.',
      status: 'done',
      priority: 'high',
      size: 'xs',
      createdAt: '2024-11-15T20:19:34.069Z',
      updatedAt: '2024-11-16T20:19:34.069Z',
      expectedDoneAt: '2024-11-17T20:19:34.069Z',
      doneAt: '2024-11-16T18:19:34.069Z',
      assignedToUser: {
        id: 3,
        name: 'Kirill',
        surname: 'Belolipetsky',
        email: 'kirill@gmail.com',
      },
      comments: [
        {
          id: 1,
          user: {
            id: 3,
            name: 'Artem',
            surname: 'Lukichev',
            email: 'artem@gmail.com',
          },
          createdAt: '2024-11-16T00:50:49.951Z',
          updatedAt: null,
          content: "I really don't think we should do that...",
        },
      ],
    },
  })
  async get(@Param('id', ParseIntPipe) id: number, @Req() req: HasJwt) {
    return this.tasksService.get(id, req.user.sub);
  }
}
