# SASS的配置

## gulp-sass 
[![Build Status](https://travis-ci.org/dlmanning/gulp-sass.svg?branch=master)](https://travis-ci.org/dlmanning/gulp-sass) 
[![Join the chat at https://gitter.im/dlmanning/gulp-sass](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dlmanning/gulp-sass?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) 



## 引入模块

```js
const sass = require("sass");
```

## 声明并定义编译sass文件的函数

```js
function sassFn(){
    return gulp.src(["src/sass/*.scss"]).pipe(sass()).pipe(gulp.dest("server/css"));
}
```



## 声明并定义监视函数

```js
function watchFn(){
    gulp.watch(["src.sass/*scss"],sassFn);
}
```



## 暴露入口

```js
exports.watch = watchFn;
```

