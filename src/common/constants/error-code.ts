// 系统统一错误码定义（仅举例，你可以自己扩展）
export const ErrorCode = {
    // 通用错误
    UNKNOWN_ERROR: { code: 1000, message: '系统未知错误' },

    // 用户模块
    USER_EXISTS: { code: 1001, message: '用户已存在' },
    USER_NOT_FOUND: { code: 1002, message: '用户不存在' },
    PASSWORD_INCORRECT: { code: 1003, message: '密码错误' },

    // 角色模块
    ROLE_NOT_FOUND: { code: 2001, message: '角色不存在' },
    ROLE_NAME_DUPLICATE: { code: 2002, message: '角色名已存在' },

    // 登录认证
    UNAUTHORIZED: { code: 3001, message: '未授权' },
    // 通用错误

    // 角色模块
    ROLE_DUPLICATE: { code: 2002, message: '角色名称重复' },

    // 用户模块
};
