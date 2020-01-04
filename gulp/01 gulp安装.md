# gulp安装

node是一个命令行工具，自带了一种下载工具npm，被称为包管理器，使用这个工具需要用到两个命令

npm install 工具名    //安装软件

npm uninstall 工具名  //卸载软件 

## 安装全局环境

1.gulp的全局环境类似于下载器，在使用gulp之前需要先安装环境

```
npm install gulp -g 
```

下载完成之后执行   

```
gulp -v 
```

查看gulp的版本，安装完成     

## 安装局部环境

2.创建一个文件夹，起个任意名字，从命令行中进入当前文件夹

初始化项目配置文件

```
npm init
```

配置局部环境

```
npm install gulp --save-dev
```

下载完成后执行

```js
gulp -v 
```

会出现全局和局部的版本号

## 设置配置信息     

3.执行npm init 

设置配置信息，可以全部为默认（gulp项目的名称不允许为`gulp`）