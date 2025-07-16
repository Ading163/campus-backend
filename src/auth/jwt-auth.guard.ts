import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 用于 @UseGuards() 装饰器中
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
