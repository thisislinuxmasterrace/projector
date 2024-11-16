import {
  IsIn,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Priority, Size, Status } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ title: 'Project id' })
  @IsNotEmpty()
  @IsInt()
  projectId: number;

  @ApiProperty({ title: 'Task name' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ title: 'Task description', required: false })
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    title: 'Status',
    default: 'todo',
    description: 'possible values: "todo", "inProgress", "done"',
  })
  @IsNotEmpty()
  @IsIn(['todo', 'inProgress', 'done'])
  status: Status;

  @ApiProperty({
    title: 'Priority',
    default: 'none',
    description: 'possible values: "none", "low", "medium", "high"',
  })
  @IsNotEmpty()
  @IsIn(['none', 'low', 'medium', 'high'])
  priority: Priority;

  @ApiProperty({
    title: 'Size',
    default: 'none',
    description: 'possible values: "none", "xs", "s", "m", "l", "xl"',
  })
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
