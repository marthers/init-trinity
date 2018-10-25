# bash
## Install
```bush
// install dependencies
npm install --save-dev --global
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```

# 简介

## 功能

- 登录/登出
- 权限管理
    - 列表过滤
    - 权限切换
- 组件
- 表单编辑
- 表格
- 错误页面
    - 403页面
    - 404页面
    - 500页面
- 高级路由
    - 动态路由
    - 带参页面
- 收缩侧边栏
- tag标签导航
- 个人中心

## 文件结构
```shell
.
├── build  项目构建配置
├── config  开发相关配置
└── src
    ├── api  AJAX请求
    └── assets  项目静态资源
        ├── icons  自定义图标资源
        └── images  图片资源
    ├── components  业务组件
    ├── config  项目运行配置
    ├── directive  自定义指令
    ├── libs  封装工具函数
    ├── locale  多语言文件
    ├── mock  mock模拟数据
    ├── router  路由配置
    ├── store  Vuex配置
    ├── view  页面文件
    └── tests  测试相关
```
