import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Priority, Size, Status } from '@prisma/client';

export class UpdateTaskDto {
  @ApiProperty({ title: 'Task name', required: false })
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ title: 'Task description', required: false })
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    title: 'Status',
    required: false,
    default: 'todo',
    description: 'possible values: "todo", "inProgress", "done"',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsIn(['todo', 'inProgress', 'done'])
  status: Status;

  @ApiProperty({
    title: 'Priority',
    required: false,
    default: 'none',
    description: 'possible values: "none", "low", "medium", "high"',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsIn(['none', 'low', 'medium', 'high'])
  priority: Priority;

  @ApiProperty({
    title: 'Size',
    required: false,
    default: 'none',
    description: 'possible values: "none", "xs", "s", "m", "l", "xl"',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsIn(['none', 'xs', 's', 'm', 'l', 'xl'])
  size: Size;

  @ApiProperty({
    title: 'Expected to be done at',
    required: false,
    description: 'date string in ISO8601 format',
  })
  @IsOptional()
  @IsISO8601()
  expectedDoneAt: string;

  @ApiProperty({
    title: 'Assigned to user (id)',
    required: false,
    description: 'id of user',
  })
  @IsOptional()
  @IsInt()
  assignedToUserId: number;
}
