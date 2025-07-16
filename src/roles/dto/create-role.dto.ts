import { IsNotEmpty, IsString } from 'class-validator';

// 创建角色时使用的 DTO（Data Transfer Object）
// 用于校验客户端提交的数据格式是否合法
export class CreateRoleDto {
  // name 字段不能为空，且必须是字符串
  @IsNotEmpty({ message: '角色名称不能为空' })
  @IsString()
  name: string;

  // description 描述字段可选，但如果传了，也必须是字符串
  @IsString()
  description?: string;
}
