import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
     ConfigModule.forRoot({
       isGlobal: true, // ✅ 全局可用
       envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      autoLoadEntities: process.env.DB_AUTOLOAD_ENTITIES === 'true',
      charset: 'utf8mb4',
    }),
    UsersModule,
    RolesModule, // 👈 添加这一行
  ],
})
export class AppModule {}
