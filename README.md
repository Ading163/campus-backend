
# 🏫 Campus Service Backend (NestJS + MySQL)

一个基于 NestJS 框架构建的校园服务后台系统，已实现用户注册、登录、角色管理、JWT 鉴权、统一响应等核心功能。

---

## ✨ 项目功能（已完成）

- ✅ 用户注册接口（/users/register）
- ✅ 用户登录接口（/users/login）
- ✅ 密码加密存储（bcrypt）
- ✅ JWT 鉴权与策略
- ✅ 支持角色管理（admin、teacher、staff...）
- ✅ 使用 TypeORM 操作 MySQL
- ✅ 全局统一响应格式（含 code / message / data）
- ✅ 自定义错误码系统
- ✅ 接口守卫保护（@UseGuards(JwtAuthGuard)）

---

## 🛠️ 技术栈

- NestJS
- TypeORM
- MySQL
- JWT（@nestjs/jwt）
- bcrypt
- class-validator
- Passport
- dotenv

---

## ⚙️ 环境配置

创建 `.env` 文件（或拷贝 `.env.example`）：

```env
# JWT配置
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRES_IN=7d

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=campus_service
```

---

## 🚀 启动项目

```bash
# 安装依赖
npm install

# 启动开发环境
npm run start:dev
```

---

## 📦 接口说明

### 用户注册

```
POST /users/register
```

#### 请求体：

```json
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "password": "123456",
  "roleId": 12
}
```

---

### 用户登录

```
POST /users/login
```

#### 请求体：

```json
{
  "email": "zhangsan@example.com",
  "password": "123456"
}
```

#### 返回示例：

```json
{
  "code": 200,
  "message": "请求成功",
  "data": {
    "accessToken": "xxxxx.yyyyy.zzzzz",
    "user": {
      "id": 1,
      "email": "zhangsan@example.com",
      "role": {
        "name": "admin"
      }
    }
  }
}
```

---

### 获取当前登录用户信息（受保护）

```
GET /users/me
Authorization: Bearer <accessToken>
```

---

## 🧩 接下来计划实现的功能（To Do）

- [ ] RBAC 权限控制：@Roles() + RolesGuard
- [ ] Swagger 接口文档自动生成
- [ ] 用户管理：列表、详情、更新
- [ ] 登出 / Token 黑名单机制（可选）
- [ ] 接口权限与模块权限结构设计

---

## 📁 项目结构（简要）

```
src/
│
├── auth/              # 鉴权模块（登录、JWT、策略）
├── users/             # 用户模块（注册、用户信息）
├── roles/             # 角色模块（增删改查）
├── common/            # 通用模块（拦截器、常量、错误码等）
├── app.module.ts      # 主模块
├── main.ts            # 项目入口
```

---

## 📄 License

MIT License © 2025 Jiading Wu
