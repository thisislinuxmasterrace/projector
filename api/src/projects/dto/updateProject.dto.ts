import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ title: 'Id' })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    title: 'Name',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
