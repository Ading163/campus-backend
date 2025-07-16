import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../roles/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ErrorCode } from 'src/common/constants/error-code';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>,
    ) { }

    // 注册新用户
    async register(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const { email, password, roleId, ...rest } = dto;

        // 检查邮箱是否已存在
        const existing = await this.userRepo.findOne({ where: { email } });
        if (existing) {
            throw new HttpException(ErrorCode.USER_EXISTS, 409);
        }

        // 加密用户密码
        const hashed = await bcrypt.hash(password, 10);

        // 如果没有 roleId，就默认使用角色 ID 为 12（即 default）
        const role = await this.roleRepo.findOne({
            where: { id: roleId ?? 12 },
        });

        if (!role) {
            throw new HttpException(ErrorCode.ROLE_NOT_FOUND, 404);
        }

        // 构建用户实体对象
        const user = this.userRepo.create({
            ...rest,      // name、phone、avatar 等
            email,
            password: hashed,
            role,
        });

        const saved = await this.userRepo.save(user);

        // 返回结果时移除密码字段
        const { password: _, ...result } = saved;
        return result;
    }
}
