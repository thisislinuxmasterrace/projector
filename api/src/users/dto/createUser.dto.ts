import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    title: 'Name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    title: 'Surname',
    required: false,
  })
  @IsNotEmpty()
  surname: string;

  @ApiProperty({
    title: 'Email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'Password',
  })
  @IsNotEmpty()
  password: string;
}
