import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateInviteDto {
  @ApiProperty({ title: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'User role',
    description:
      'owner - has access to destructive actions and invites, maintainer - can only create/edit tasks',
  })
  @IsNotEmpty()
  role: string;
}
