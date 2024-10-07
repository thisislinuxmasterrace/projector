import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class ReadProjectDto {
  @ApiProperty({ title: 'Id' })
  @IsNotEmpty()
  @IsNumber()
  @Transform((params) => parseInt(params.value))
  id: number;
}
