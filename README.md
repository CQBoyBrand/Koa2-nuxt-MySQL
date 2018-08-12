# Koa2-nuxt-MySQL
Koa2+nuxt+MySQL重构博客


### 这里面一共是三个项目
 #### blog文件夹下是博客的前端部分
 #### blog-admin文件夹下是博客的后端管理部分----用来发布文章的
 #### blog-server文件夹下是博客的服务端部分---用来操作数据库和提供接口的


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
    pakage.json
    nuxt.config.js(据说不是必须上传？？最好还是上传吧)
    最好在服务器这三个文件（夹）的同一级目录下新建一个static来方favicon.ico文件，有不然这个图片显示不出来

    // blog-admin
    cnpm run test // 打包测试服务器地址
    cnpm run build // 打包正式服务器地址



    ```
    ### blog-server
    这个不用打包，直接上传服务器
   > node_modules下的文件就不要上传了，太大了，把其他文件上传服务器后运行   npm install 就好了