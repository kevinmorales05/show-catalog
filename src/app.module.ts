import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    AuthModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'postgres://dpg-coj56jtjm4es73a2vfhg-a.frankfurt-postgres.render.com',
    //   port: 5432,
    //   username: 'kevinmorales',
    //   password: 'a9cgy2apNgB6kmaEZAQiOX94pdLHPjbF',
    //   database: 'showcatalog',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   ssl: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  //postgres://dpg-coj56jtjm4es73a2vfhg-a.frankfurt-postgres.render.com
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
