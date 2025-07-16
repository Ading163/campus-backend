import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryFailedError } from 'typeorm';
import { ErrorCode } from 'src/common/constants/error-code';
import { HttpException } from '@nestjs/common';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  // 创建角色
// 创建角色，防止名称重复
async create(dto: CreateRoleDto): Promise<Role> {
  try {
    // 创建角色实体
    const role = this.roleRepo.create(dto);
    
    // 保存到数据库
    return await this.roleRepo.save(role);
  } catch (error) {
    // 捕获数据库唯一约束错误（重复角色名）
    if (
      error instanceof QueryFailedError &&
      (error as any).message.includes('Duplicate entry')
    ) {
      throw new HttpException(ErrorCode.ROLE_DUPLICATE, 409); // 业务错误码
    }

    // 其他错误，返回通用错误码
    throw new HttpException(ErrorCode.UNKNOWN_ERROR, 500);
  }
}


  // 获取所有角色
  async findAll(): Promise<Role[]> {
    return this.roleRepo.find();
  }

  // 获取单个角色
  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepo.findOne({ where: { id } });
    if (!role) throw new NotFoundException('角色不存在');
    return role;
  }

  // 更新角色
  async update(id: number, dto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    Object.assign(role, dto);
    return this.roleRepo.save(role);
  }

  // 删除角色
  async remove(id: number): Promise<void> {
    const result = await this.roleRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('角色删除失败');
    }
  }
}
