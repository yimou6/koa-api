## koa-simple-shop-server
koa 学习项目

### 依赖

- [koa](https://www.npmjs.com/package/koa) koa
- [koa-body](https://www.npmjs.com/package/koa-body) 请求正文解析器中间件，支持`multipart`,`multipart`和`json`。
- [koa-static](https://www.npmjs.com/package/koa-static) 用于处理静态文件
- [sequelize](https://www.npmjs.com/package/sequelize) 一个基于Promise的Node.js ORM工具(简单的来说，可以用操作对象的方式去操作数据库)
- [mysql2](https://www.npmjs.com/package/mysql2) Node.js的MySQL客户端
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) 加密
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) 生成和验证token
- [koa-parameter](https://www.npmjs.com/package/koa-parameter) 用于验证接口参数的中间件
- [nodemon](https://www.npmjs.com/package/nodemon) 检测文件变化，自动重启项目。

### 目录

- `app` koa服务相关
- `config` 配置
- `controller` 控制器，处理不同的业务
- `constant` 定义一些常量
- `db` 数据库配置
- `middleware` 中间件
- `model` 数据库表
- `router` 路由
- `services` 服务，操作数据库

