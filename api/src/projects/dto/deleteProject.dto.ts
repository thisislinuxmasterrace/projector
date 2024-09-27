import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteProjectDto {
  @ApiProperty({ title: 'Id' })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
