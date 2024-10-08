import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({
    title: 'Name',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  name?: string;
}
