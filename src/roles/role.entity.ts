import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity'; // 引入用户实体类，建立一对多关系

// @Entity 表示这是一个数据库中的表，表名默认是 'role'
@Entity()
export class Role {
  // 主键，自增 ID
  @PrimaryGeneratedColumn()
  id: number;

  // 角色名称，如 'student'、'staff'、'admin'
  @Column({ unique: true })
  name: string;

  // 角色描述信息，比如 '学生用户'
  @Column({ nullable: true })
  description: string;

  // 与用户表建立一对多关系：一个角色可以对应多个用户
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
