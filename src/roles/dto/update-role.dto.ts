import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

// 更新角色的 DTO
// 字段都是可选的（因为可能只改一项）
export class UpdateRoleDto {
  // name 可选，但如果有值则不能为空字符串
  @IsOptional()
  @IsNotEmpty({ message: '角色名称不能是空字符串' })
  @IsString()
  name?: string;

  // description 同上
  @IsOptional()
  @IsString()
  description?: string;
}
