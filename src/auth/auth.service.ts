import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { ErrorCode } from 'src/common/constants/error-code';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 登录验证逻辑
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['role'], // 获取关联角色
    });

    if (!user) {
      throw new HttpException(ErrorCode.USER_NOT_FOUND, 404);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(ErrorCode.PASSWORD_INCORRECT, 401);
    }

    const { password: _, ...result } = user;
    return result;
  }

  // 登录成功后生成 token
  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role.name,
    };

    return {
      token: this.jwtService.sign(payload),
      user,
    };
  }
}
