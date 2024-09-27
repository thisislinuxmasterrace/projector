import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInviteDto {
  @ApiProperty({title: "Project Id"})
  @IsNotEmpty()
  @IsNumber()
  projectId: number;

  @ApiProperty({title: "User email"})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({title: "User role", description: "owner - has access to destructive actions and invites, maintainer - can only create/edit tasks"})
  @IsNotEmpty()
  role: string;
}