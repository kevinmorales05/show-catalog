import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFIlterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  // @Get()
  // getAllTasks(): Task[] {
  //   return this.taskService.getAllTasks();
  // }
  @Get()
  //useful to filter information
  getTasks(@Query() filterDto: GetTaskFIlterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): string {
    return this.taskService.deleteTaskById(id);
  }
  @Put(':id')
  updateTaskStatus(@Param() params: any): string {
    return `task status updated successfully! ${params.id}`;
  }
  @Patch('/:id/status')
  updateStatus(@Param() params: any, @Body('status') status: TaskStatus): Task {
    return this.taskService.updateStatus(params.id, status);
  }
}
