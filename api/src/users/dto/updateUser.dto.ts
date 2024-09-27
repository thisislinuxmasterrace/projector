import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    title: 'Name',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    title: 'Surname',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  surname?: string;

  @ApiProperty({
    title: 'Email',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({
    title: 'Password',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  password?: string;
}
