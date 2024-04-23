import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './taskStatus.enum';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFIlterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    const save = await this.taskRepository.save(task);
    if (!save) {
      throw new Error('We got problems creating a new task!');
    }
    return task;
  }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    }
    return found;
  }
  async deleteTaskById(id: string): Promise<string> {
    const deleteTask = await this.taskRepository.delete({ id });
    //console.log('delete ', deleteTask);
    if (deleteTask.affected == 0) {
      throw new NotFoundException(`The task with the id ${id} was not found!`);
    }
    return 'The task was deleted successfully!';
  }
  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const found = await this.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found!`);
    } else {
      found.status = status;
      await this.taskRepository.save(found);
      return found;
    }
  }
  async getTasksWithFilters(filterDto: GetTaskFIlterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    let tasks = await this.taskRepository.find();
    console.log('complete tasks', tasks);
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }
}
