import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])], // 👈 注册 Role 实体
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService, TypeOrmModule], // 导出供其他模块使用
})
export class RolesModule {}
