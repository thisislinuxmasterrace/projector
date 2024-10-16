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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/createComment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { HasJwt } from '../types/HasJwt';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req: HasJwt) {
    return this.commentsService.create(createCommentDto, req.user.sub);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: HasJwt,
  ) {
    return this.commentsService.update(id, updateCommentDto, req.user.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: HasJwt) {
    return this.commentsService.delete(id, req.user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async get(@Param('id', ParseIntPipe) id: number, @Req() req: HasJwt) {
    return this.commentsService.get(id, req.user.sub);
  }
}
