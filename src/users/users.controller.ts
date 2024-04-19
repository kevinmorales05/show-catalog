import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): string {
    return 'This action return all of the users';
  }

  @Post()
  createUser(): string {
    return 'user created successfully';
  }
  @Delete(':id')
  deleteUser(@Param() params: any): string {
    console.log(`Deleted user id ${params.id}`);
    return 'user deleated successfully!';
  }
}
