import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from '../roles/role.entity'; // 引入角色实体类（稍后我们会创建）

// @Entity() 是 TypeORM 的装饰器，表示这是一个数据库表
@Entity()
export class User {
  // 主键，自增 id
  @PrimaryGeneratedColumn()
  id: number;

  // 用户姓名
  @Column()
  name: string;

  // 用户邮箱，设置为唯一，防止重复注册
  @Column({ unique: true })
  email: string;

  // 用户密码，后续我们会用 bcrypt 加密后存储
  @Column()
  password: string;

  // 用户语言偏好，默认是英文 'en'，也可以是 'zh'
  @Column({ default: 'en' })
  language: string;

  // 用户手机号，可选字段，nullable 表示可以为空
  @Column({ nullable: true })
  phone: string;

  // 用户头像 URL 地址，可选字段
  @Column({ nullable: true })
  avatar: string;

  // 用户是否启用，默认是启用 true，可用于“软删除”
  @Column({ default: true })
  isActive: boolean;

  // 用户创建时间，默认当前时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // 用户更新时间，自动在更新时修改时间戳
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // 关联角色，ManyToOne 表示：多个用户可以属于一个角色
  // eager: true 表示查询用户时自动加载关联的角色
  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;
}
