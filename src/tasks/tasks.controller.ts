import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFIlterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  //useful to filter information
  getTasks(@Query() filterDto: GetTaskFIlterDto): Promise<Task[]> {
    return this.taskService.getTasksWithFilters(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<string> {
    return this.taskService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateStatus(
    @Param() params: any,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateStatus(params.id, status);
  }
}
