import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule, // ✅ 引入配置模块
    JwtModule.registerAsync({
      imports: [ConfigModule], // 引入 ConfigModule
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN') || '7d',
        },
      }),
    }),
  ],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
