import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
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

  @ApiProperty({
    title: 'Remember me',
  })
  @IsNotEmpty()
  rememberMe: boolean;
}
