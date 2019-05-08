# Koa2-nuxt-MySQL
Koa2+nuxt+MySQL重构博客


### 这里面一共是三个项目
 #### blog文件夹下是博客的前端部分（nuxt+elementui+axios）
 #### admin文件夹下是博客的后端管理部分----用来管理文章的(vue+elementUI+axios,vue-cli3)
 #### server文件夹下是博客的服务端部分---用来操作数据库和提供接口的(koa2+mysql+jwt)


 ### 使用：
 分别进入相应文件夹下
 
 ### 然后安装依赖
 ```bash
 cnpm install

 ```
 ### 运行
  ```bash
  cnpm run dev

  ```
 ### 打包
 ```bash
//blog
        cnpm run build
        打包部署需要上传
        .nuxt
        server
        pakage.json
        nuxt.config.js
        最好在服务器这四个文件（夹）的同一级目录下新建一个static来方favicon.ico文件，有不然这个图片显示不出来

// admin
        在.env,  .env.production中配置不同的环境

// server
    
        这个不用打包，直接上传服务器
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
