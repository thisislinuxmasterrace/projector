import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ title: 'Task id' })
  @IsNotEmpty()
  @IsInt()
  taskId: number;

  @ApiProperty({ title: 'Comment content' })
  @IsNotEmpty()
  content: string;
}
