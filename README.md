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
- [x] **server**：计划近期用 `nest.js` 进行重构（纯粹是想学习用用 `TypeScript`）
#### 2020 年 2 月 25 日
    博客线上代码全部替换
    
#### 2020 年 2 月 22 日
    接口进度已完成大约95%

#### 2020 年 2 月 16 日

    admin 端接口基本调整完，准备开始调整前端接口

#### 2020 年 2 月 12 日

    admin 端接口除了文章相关的，基本调整完

#### 2020 年 1 月 5 日
    开始着手折腾～～

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

        pm2启动：
        pm2 start npm --name "blog" -- run start


// admin
        在.env,  .env.production中配置不同的环境
        npm run build
        上传 dist 文件夹

// server
    
        // 这个不用打包，直接上传服务器
        node_modules下的文件就不要上传了，太大了，把其他文件上传服务器后运行   npm install 就好了
        
        注意自己复制 .env.example 粘贴为 .env 并修改其中内容

        修改 backend 和 frontend 下的 main.js，处理跨域问题

        const app = await NestFactory.create(AppModule,{
            // cors: {
            //     "origin": ['http://www.brandhuang.com','https://www.brandhuang.com','http://admin.brandhuang.com','https://admin.brandhuang.com'],
            //     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            //     "preflightContinue": false,
            //     "optionsSuccessStatus": 204
            // }
            cors: true
        });
        
        在 server 端的根目录下（此启动方式用于本地开发，服务端部署时，启动方式请看最下面！）
        运行：
        nest start -w backend 启动 admin 端的接口服务

        运行：
        nest start -w frontend 启动 web 端的接口服务
            
       
// blog.sql

        本项目的数据库结构文件。数据库用的mysql
        
        
        根据前面的配置，本地安装的有mysql，导入数据库文件后，应该就能把整个项目跑起来了
```

#### 初次使用本项目请注意
由于数据库没有出事数据，要登陆后台需要先注册用户

操作详情参考：[issues #8](https://github.com/CQBoyBrand/Koa2-nuxt-MySQL/issues/8)

 **部署 `Server` 端注意了！！！**

 建议在本地执行 `npm run build frontend` 和 `npm run build backend` 完后
 
 (记得执行完一个就部署一个，因为 `dist` 文件夹会被覆盖，在本地运行的时候你会发现 `dist` 目录下可以同时存在 `frontend` 和 `backend` 两个文件夹，**但是** `build` 的时候不会！！)

 将 `dist` 目录下的 `frontend` 和 `backend` 文件夹放到服务器上的 `dist` 文件夹中。

 然后启动（我用 `pm2`）:
 ```js
pm2 start npm --name "frontend" -- run frontend
pm2 start npm --name "backend" -- run backend
 ```
 
  我 1 核 1G 的垃圾服务器在服务器直接执行 `nest start frontend` ，直接卡爆。。。,高配置的应该没啥问题吧


  有问题需可以来公众号找我，扫码或微信搜索「九零后重庆崽儿」

  ![公众号](./brandQRcode.jpg)