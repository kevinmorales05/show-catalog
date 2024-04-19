import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post()
  singin(): string {
    return 'Logged successfully';
  }
  @Post()
  singout(): string {
    return 'Log out created successfully';
  }
}
