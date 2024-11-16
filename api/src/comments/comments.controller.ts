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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Create a comment.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    example: {
      id: 2,
      content: 'Lol this is so terrible.',
      taskId: 20,
      projectId: 6,
      user: {
        id: 3,
        name: 'Kirill',
        surname: 'Belolipetsky',
        email: 'kirill@gmail.com',
      },
      createdAt: '2024-11-16T01:04:53.073Z',
      updatedAt: null,
    },
  })
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req: HasJwt) {
    return this.commentsService.create(createCommentDto, req.user.sub);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a comment.' })
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 1,
      content: "I really don't think we should do that...",
      taskId: 20,
      projectId: 6,
      user: {
        id: 3,
        name: 'Kirill',
        surname: 'Belolipetsky',
        email: 'kirill@gmail.com',
      },
      createdAt: '2024-11-16T00:50:49.951Z',
      updatedAt: '2024-11-16T01:04:04.459Z',
    },
  })
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
  @ApiOperation({ summary: 'Delete a comment.' })
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 1,
      content: "I really don't think we should do that...",
      taskId: 20,
      projectId: 6,
      user: {
        id: 3,
        name: 'Kirill',
        surname: 'Belolipetsky',
        email: 'kirill@gmail.com',
      },
      createdAt: '2024-11-16T00:50:49.951Z',
      updatedAt: '2024-11-16T01:04:04.459Z',
    },
  })
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: HasJwt) {
    return this.commentsService.delete(id, req.user.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a comment.' })
  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 1,
      content: "I really don't think we should do that...",
      taskId: 20,
      projectId: 6,
      user: {
        id: 3,
        name: 'Kirill',
        surname: 'Belolipetsky',
        email: 'kirill@gmail.com',
      },
      createdAt: '2024-11-16T00:50:49.951Z',
      updatedAt: '2024-11-16T01:04:04.459Z',
    },
  })
  async get(@Param('id', ParseIntPipe) id: number, @Req() req: HasJwt) {
    return this.commentsService.get(id, req.user.sub);
  }
}
