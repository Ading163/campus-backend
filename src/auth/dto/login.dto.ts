import { IsEmail, IsNotEmpty } from 'class-validator';

// 登录字段 DTO 验证
export class LoginDto {
  @IsEmail({}, { message: '请输入合法邮箱' })
  email: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
