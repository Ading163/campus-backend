import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true, // ✅ 全局可用
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'campus_service',
      synchronize: true,
      autoLoadEntities: true,
      charset: 'utf8mb4',
    }),
    UsersModule,
    RolesModule, // 👈 添加这一行
    
  ],
})
export class AppModule {}
