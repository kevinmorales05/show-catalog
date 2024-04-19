import { TaskStatus } from '../task.model';

export class GetTaskFIlterDto {
  status?: TaskStatus;
  search?: string;
}
