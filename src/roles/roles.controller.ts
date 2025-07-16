import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // 创建角色
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<Role> {
    return this.rolesService.create(dto);
  }

  // 获取所有角色
  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  // 获取指定角色
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(+id);
  }

  // 更新角色
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto): Promise<Role> {
    return this.rolesService.update(+id, dto);
  }

  // 删除角色
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(+id);
  }
}
