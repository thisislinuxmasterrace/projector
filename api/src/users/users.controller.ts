import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    example: {
      id: 2,
      email: 'archhaze@hotmail.lol',
      name: 'Kirby',
      surname: 'Bel',
      invites: [],
      projects: [],
    },
  })
  @Get('me')
  @ApiOperation({ summary: 'get currently authorized user' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getCurrentUser(@Req() req: HasJwt) {
    return this.usersService.findOne(req.user.sub);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    example: {
      id: 2,
      email: 'archhaze@hotmail.lol',
      name: 'Dmitry',
      surname: 'Bel',
    },
  })
  @Patch('me')
  @ApiOperation({ summary: 'update currently authorized user' })
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
    status: HttpStatus.OK,
    example: {
      id: 2,
      email: 'archhaze@hotmail.lol',
      name: 'Kirby',
      surname: 'Bel',
    },
  })
  @Post()
  @ApiOperation({ summary: 'creates a new user' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
