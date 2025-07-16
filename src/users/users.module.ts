import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesModule } from '../roles/roles.module'; // ✅ 引入角色模块
import { AuthModule } from '../auth/auth.module'; // ✅ 引入

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    AuthModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
