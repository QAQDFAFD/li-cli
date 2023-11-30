# vue-base-template

> vue+js 开发模板

## 包含的内容

### 格式化

-   [x] eslint 配置 -> `.eslintrc.js` + `.eslintignore`
-   [x] prettier 配置 -> `.prettierrc` + `.prettierignore`
-   [x] 冲突解决：`eslint-config-prettier` + `eslint-plugin-prettier`

### 开发包

-   [x] pinia 安装 + 使用
-   [x] axios 安装 + 二次封装
-   [x] sass 安装 + 全局变量的配置
-   [x] vue-router 安装 + 使用
-   [x] animate.css 的引入
-   [x] element 按需引入
-   [x] echarts 按需引入
-   [x] iconfont 图标库引入

## 项目初始化

-   [x] 公共样式的编写
-   [x] 典型组件的抽离
    -   [x] SvgIcon：图标组件
-   [x] `.env.development` + `.env.production` + `.env.test`
-   [x] `.gitignore`
-   [x] `README.md` 的编写
-   [x] `vite.config.js` 配置代理 + @符号
-   [x] `.cssrem` 的配置（第三方插件用于**单位转换**）
-   [x] `commitlint` 提交的 comment 的规范化
-   [x] `husky` 在提交代码时对代码进行格式化
-   [x] 配置开发包 -> 统一开发包的使用 -> 只允许使用 `pnpm`
-   [x] 全局组件（`globalComponent`）的注册
    -   [x] icon组件 -> 如果要使用 iconfont 中的图标，直接复制 svg 即可
-   [x] `mockjs` 相关数据的配置 -> **模拟后端**
