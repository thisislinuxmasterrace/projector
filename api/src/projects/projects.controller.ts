import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/createProject.dto';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { ReadProjectDto } from './dto/readProject.dto';
import { DeleteProjectDto } from './dto/deleteProject.dto';
import { CreateInviteDto } from './dto/createInvite.dto';
import { AcceptInviteDto } from './dto/acceptInvite.dto';
import { RejectInviteDto } from './dto/rejectInvite.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('crud')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createProjectDto: CreateProjectDto, @Req() req: any) {
    return this.projectsService.create(createProjectDto, req.user.sub);
  }

  @Patch('crud')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(@Body() updateProjectDto: UpdateProjectDto, @Req() req: any) {
    return this.projectsService.update(updateProjectDto, req.user.sub);
  }

  @Get('crud')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async read(@Query() readProjectDto: ReadProjectDto, @Req() req: any) {
    return this.projectsService.read(readProjectDto, req.user.sub);
  }

  @Delete('crud')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(@Body() deleteProjectDto: DeleteProjectDto, @Req() req: any) {
    return this.projectsService.delete(deleteProjectDto, req.user.sub);
  }

  @Post('invites/create')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async createInvite(
    @Body() createInviteDto: CreateInviteDto,
    @Req() req: any,
  ) {
    return this.projectsService.createInvite(createInviteDto, req.user.sub);
  }

  @Post('invites/accept')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async acceptInvite(
    @Body() acceptInviteDto: AcceptInviteDto,
    @Req() req: any,
  ) {
    return this.projectsService.acceptInvite(acceptInviteDto, req.user.sub);
  }

  @Delete('invites/reject')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async rejectInvite(
    @Body() rejectInviteDto: RejectInviteDto,
    @Req() req: any,
  ) {
    return this.projectsService.rejectInvite(rejectInviteDto, req.user.sub);
  }
}
