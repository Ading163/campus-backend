import { Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/dto/login.dto';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    // 注册接口（保持不变）
    @Post('register')
    async register(@Body() dto: CreateUserDto) {
        const user = await this.usersService.register(dto);
        return user; // 统一拦截器封装
    }

    // ✅ 登录接口
    @Post('login')
    async login(@Body() dto: LoginDto) {
        const user = await this.authService.validateUser(dto.email, dto.password);
        const result = await this.authService.login(user);
        return result;
    }

}
