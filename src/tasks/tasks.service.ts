import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFIlterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Complete Project Proposal',
      description: 'Draft and finalize the project proposal document.',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '2',
      title: 'Prepare Presentation',
      description: 'Create slides and prepare for the upcoming presentation.',
      status: TaskStatus.OPEN,
    },
    {
      id: '3',
      title: 'Review Code',
      description: 'Review and provide feedback on the latest code changes.',
      status: TaskStatus.OPEN,
    },
    {
      id: '4',
      title: 'Test New Feature',
      description:
        'Test the functionality of the new feature on different environments.',
      status: TaskStatus.OPEN,
    },
    {
      id: '5',
      title: 'Update Documentation',
      description: 'Update user manuals and technical documentation.',
      status: TaskStatus.OPEN,
    },
  ];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const newTask: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }
  getTaskById(id: string): Task {
    console.log('service', id);
    return this.tasks.find((task) => task.id === id);
  }
  deleteTaskById(id: string): string {
    this.tasks.filter((task) => task.id !== id);
    return 'The task was deleted successfully!';
  }
  updateStatus(id: string, status: TaskStatus): Task {
    this.tasks.forEach((task) => {
      if (task.id === id) {
        task.status = status;
        console.log('this is the updated task ', task);
      }
    });
    return this.tasks.find((task) => task.id === id);
  }
  getTasksWithFilters(filterDto: GetTaskFIlterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
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
