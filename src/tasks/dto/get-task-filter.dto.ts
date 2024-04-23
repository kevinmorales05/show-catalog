import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../taskStatus.enum';

export class GetTaskFIlterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
  @IsOptional()
  @IsString()
  search?: string;
}
