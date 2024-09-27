import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    title: 'Name',
  })
  @IsNotEmpty()
  name: string;
}
