import {
  Body,
  Controller,
  Delete,
  Get,
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { CreateInviteDto } from './dto/createInvite.dto';
import { AcceptInviteDto } from './dto/acceptInvite.dto';
import { RejectInviteDto } from './dto/rejectInvite.dto';
import { HasJwt } from '../types/HasJwt';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createProjectDto: CreateProjectDto, @Req() req: HasJwt) {
    return this.projectsService.create(createProjectDto, req.user.sub);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
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
  async read(@Param('id', ParseIntPipe) id: number, @Req() req: HasJwt) {
    return this.projectsService.read(id, req.user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: HasJwt) {
    return this.projectsService.delete(id, req.user.sub);
  }

  @Post('invites/create')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createInvite(
    @Body() createInviteDto: CreateInviteDto,
    @Req() req: HasJwt,
  ) {
    return this.projectsService.createInvite(createInviteDto, req.user.sub);
  }

  @Post('invites/accept')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async acceptInvite(
    @Body() acceptInviteDto: AcceptInviteDto,
    @Req() req: HasJwt,
  ) {
    return this.projectsService.acceptInvite(acceptInviteDto, req.user.sub);
  }

  @Delete('invites/reject')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async rejectInvite(
    @Body() rejectInviteDto: RejectInviteDto,
    @Req() req: HasJwt,
  ) {
    return this.projectsService.rejectInvite(rejectInviteDto, req.user.sub);
  }
}
