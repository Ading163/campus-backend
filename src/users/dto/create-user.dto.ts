import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

// 注册用户时使用的 DTO，定义并校验输入字段
export class CreateUserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  name: string;

  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @MinLength(6, { message: '密码长度不能少于 6 位' })
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsNumber()
  roleId?: number; // 可选角色 ID，不传默认 student
}
