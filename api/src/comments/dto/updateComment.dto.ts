import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({ title: 'Comment content' })
  @IsNotEmpty()
  content: string;
}
