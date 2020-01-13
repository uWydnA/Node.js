# express-generator

> 通过应用生成器工具 `express-generator` 可以快速创建一个应用的骨架。

## 安装

```
$ npm install express-generator -g
```

`-h` 参数可以列出所有可用的命令行参数：

```
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          输出使用方法
        --version       输出版本号
    -e, --ejs           添加对 ejs 模板引擎的支持
        --hbs           添加对 handlebars 模板引擎的支持
        --pug           添加对 pug 模板引擎的支持
    -H, --hogan         添加对 hogan.js 模板引擎的支持
        --no-view       创建不带视图引擎的项目
    -v, --view <engine> 添加对视图引擎（view） <engine> 的支持 (ejs|hbs|hjs|jade|pug|twig|vash) （默认是 jade 模板引擎）
    -c, --css <engine>  添加样式表引擎 <engine> 的支持 (less|stylus|compass|sass) （默认是普通的 css 文件）
        --git           添加 .gitignore
    -f, --force         强制在非空目录下创建
```

例如，如下命令创建了一个名称为 *myapp* 的 Express 应用。此应用将在当前目录下的 *myapp* 目录中创建，并且设置为使用 [Pug](https://pugjs.org/) 模板引擎（view engine）：

```
$ express --view=pug myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.pug
   create : myapp/views/layout.pug
   create : myapp/views/error.pug
   create : myapp/bin
   create : myapp/bin/www
```

然后安装所有依赖包：

```
$ cd myapp
$ npm install
```

在 MacOS 或 Linux 中，通过如下命令启动此应用：

```
$ DEBUG=myapp:* npm start
```

在 Windows 中，通过如下命令启动此应用：

```
> set DEBUG=myapp:* & npm start
```

然后在浏览器中打开 `http://localhost:3000/` 网址就可以看到这个应用了。

**总结**

1.下载生成器（脚手架）        

```
npm install express-generator -g    
```

2.创建项目目录        

```
express myapp    
```

3.进入目录        

```
cd myapp   
```

4.下载依赖        

```
npm install    
```

5.启动项目        

```
npm run start
```



通过生成器创建的应用一般都有如下目录结构：

```
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```



## 项目结构

### bin 

> 项目的入口文件，执行npm run start启动的文件        

### node_modules   

> 依赖文件，第三方模块        

### public

> 静态资源文件夹，图片，css，js        

### routes

> 路由文件，根据不同的请求路径，执行对应的处理        

### views

>前端页面，后台的模版（前后端不分离）        

### app.js

>应用各种中间件，设置静态资源文件夹，注册路由和接口，控制器        

### package.json

>模块的说明文件