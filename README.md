# Blog System

### 项目目录介绍
1. **blog** ：该文件夹存放前端代码（即用户访问的页面代码）
2. **admin** ：该文件夹存放管理后台代码（即博主用来编辑发布博客文章内容）
3. **server** ： 该文件夹用来提供 API 服务（即为 blog 和 admin 提供接口，以及进行与数据库的交互）
4. **nginxConfig** : 该文件夹是通过域名访问服务器的一些简单配置（请自行修改，更深了解请自行 Google）
5. **blog.sql** ：该文件是本博客使用的数据裤文件（方便想使用本项目的人能轻运行起来，数据库采用的 MySQL，请自行安装）

**世界不毁灭，折腾不停止！**
> 本分支将继续折腾我的个人博客，计划如下

- [ ] **blog**：等 Vue3 出来后打算采用 `TypeScript` 重构（什么时候 Vue3 出来什么时候开始）
- [ ] **admin**：计划用 React 重构（先等 server 端重构完）
- [ ] **server**：计划近期用 `nest.js` 进行重构（纯粹是想学习用用 `TypeScript`）

##### 2020 年 1 月 5 日
 开始着手折腾～～


 ### 下载:
 ```markdown
本分支还未完成，还无法运行～～
```
 ### 使用：
 分别进入相应文件夹下
 
 ### 安装依赖
 ```bash
 npm install

 ```
 ### 运行
  ```bash
  npm run dev
  ```
 ### 打包
 ```bash
//blog
        npm run build
        // 打包部署需要上传以下文件
        .nuxt
        server
        pakage.json
        nuxt.config.js
        最好在服务器这四个文件（夹）的同一级目录下新建一个static来方favicon.ico文件，有不然这个图片显示不出来

// admin
        在.env,  .env.production中配置不同的环境
        npm run build
        上传 dist 文件夹

// server
    
        // 这个不用打包，直接上传服务器
        node_modules下的文件就不要上传了，太大了，把其他文件上传服务器后运行   npm install 就好了
        
        注意自己修改server目录下的package.json中的dev代码：
        
        "scripts": {
            "dev": "nodemon index --DB_NAME=你的数据库名 --DB_USERNAME=你访问数据库的用户(如root) --DB_PASSWORD=访问数据库的密码 --DB_PORT=数据库端口
            (一般是3306) 
            --DB_HOST=localhost --qn_accessKey=上传图片到七牛云  --auth_key=上传图片到七牛云 --pwd_salt=你自定义的加密的加盐 
            --auth_default_username=默认后台登录名(目前没什么用) --auth_default_password=默认后台登录密码(目前没什么用) --baidu_site=www.brandhuang
            .com 
            --baidu_token=百度推送相关 --qn_secretKey=上传图片到七牛云 --qn_bucket=上传图片到七牛云 --EMAIL_account=评论回复邮箱 
            --EMAIL_password=邮箱密码",
            "test": "echo \"Error: no test specified\" && exit 1"
          },
          
// blog.sql

        本项目的数据库结构文件。数据库用的mysql
        
        
        根据前面的配置，本地安装的有mysql，导入数据库文件后，应该就能把整个项目跑起来了
        
 
```
