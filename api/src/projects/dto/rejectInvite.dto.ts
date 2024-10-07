import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class RejectInviteDto {
  @ApiProperty({ title: 'Invite id' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((value) => parseInt(value.value))
  inviteId: number;
}
