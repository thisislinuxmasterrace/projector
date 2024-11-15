import {
  Body,
  Controller,
  Delete,
  Get, HttpCode, HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/createProject.dto';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { CreateInviteDto } from './dto/createInvite.dto';
import { AcceptInviteDto } from './dto/acceptInvite.dto';
import { RejectInviteDto } from './dto/rejectInvite.dto';
import { HasJwt } from '../types/HasJwt';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {
  }

  @Post('')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: HttpStatus.CREATED, example: {
      'id': 7,
      'name': 'Projector',
    },
  })
  @ApiOperation({ summary: 'Create project.' })
  @ApiBearerAuth()
  async create(@Body() createProjectDto: CreateProjectDto, @Req() req: HasJwt) {
    return this.projectsService.create(createProjectDto, req.user.sub);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK, example: {
      'id': 7,
      'name': 'projector',
    },
  })
  @ApiOperation({ summary: 'Update project.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req: HasJwt,
  ) {
    return this.projectsService.update(id, updateProjectDto, req.user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK, example: {
      'id': 7,
      'name': 'projector',
    },
  })
  @ApiOperation({ summary: 'Get project by id.' })
  async read(@Param('id', ParseIntPipe) id: number, @Req() req: HasJwt) {
    return this.projectsService.read(id, req.user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK, example: {
      'id': 7,
      'name': 'projector',
    },
  })
  @ApiOperation({ summary: 'Delete project.' })
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: HasJwt) {
    return this.projectsService.delete(id, req.user.sub);
  }

  @Post('invites/create')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED, example: {
      'id': 7,
      'project': {
        'id': 5,
        'name': 'projector',
      },
      'user': {
        'email': 'kirillbelolipetsky@gmail.com',
      },
      'role': 'owner',
    },
  })
  @ApiOperation({ summary: 'Create invite to project. You need to be project owner in order to use this endpoint.' })
  async createInvite(
    @Body() createInviteDto: CreateInviteDto,
    @Req() req: HasJwt,
  ) {
    return this.projectsService.createInvite(createInviteDto, req.user.sub);
  }

  @Post('invites/accept')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK, example: {
      'id': 8,
      'project': {
        'id': 9,
        'name': 'Projector',
      },
      'user': {
        'email': 'kirillbelolipetsky@gmail.com',
      },
      'role': 'maintainer',
    },
  })
  @ApiOperation({ summary: 'Accept invite to project.' })
  async acceptInvite(
    @Body() acceptInviteDto: AcceptInviteDto,
    @Req() req: HasJwt,
  ) {
    return this.projectsService.acceptInvite(acceptInviteDto, req.user.sub);
  }

  @Delete('invites/reject')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK, example: {
      'id': 4,
      'project': {
        'id': 6,
        'name': 'Projector',
      },
      'role': 'owner',
    },
  })
  @ApiOperation({ summary: 'Reject invite to project.' })
  async rejectInvite(
    @Body() rejectInviteDto: RejectInviteDto,
    @Req() req: HasJwt,
  ) {
    return this.projectsService.rejectInvite(rejectInviteDto, req.user.sub);
  }

  @Get(':id/tasks')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get project tasks.' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK, example: [
      {
        'id': 19,
        'name': 'Main page',
        'status': 'inProgress',
        'priority': 'medium',
        'size': 'xl',
        'expectedDoneAt': '2024-11-15T20:22:56.000Z',
      },
      {
        'id': 20,
        'name': 'Login page',
        'status': 'todo',
        'priority': 'none',
        'size': 'none',
        'expectedDoneAt': null,
      },
    ],
  })
  async getTasks(@Param('id', ParseIntPipe) projectId: number, @Req() req: HasJwt) {
    return this.projectsService.getTasks(req.user.sub, projectId);
  }

  @Get(':id/users')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get project users.' })
  @ApiResponse({
    status: HttpStatus.OK, example: [
      {
        'user': {
          'id': 6,
          'name': 'Artem',
          'surname': 'Lukichev',
          'email': 'artem@gmail.com',
        },
        'role': 'owner',
      },
      {
        'user': {
          'id': 3,
          'name': 'Kirill',
          'surname': 'Belolipetsky',
          'email': 'kirill@gmail.com',
        },
        'role': 'maintainer',
      },
    ],
  })
  @ApiBearerAuth()
  async getUsers(@Param('id', ParseIntPipe) projectId: number, @Req() req: HasJwt) {
    return this.projectsService.getUsers(req.user.sub, projectId);
  }


  @Get(':id/invites')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get project invites. You need to be project owner in order to use this endpoint.' })
  @ApiResponse({
    status: HttpStatus.OK, example: [
      {
        'id': 3,
        'user': {
          'email': 'kirill@gmail.com',
        },
        'role': 'owner',
      },
    ],
  })
  @ApiBearerAuth()
  async getInvites(@Param('id', ParseIntPipe) projectId: number, @Req() req: HasJwt) {
    return this.projectsService.getInvites(req.user.sub, projectId);
  }
}
