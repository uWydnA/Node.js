# API

## src()

创建一个流，用于从文件系统读取 [Vinyl](https://www.gulpjs.com.cn/docs/api/concepts#vinyl) 对象。

**注：**BOMs(字节顺序标记)在 UTF-8 中没有任何作用，除非使用 `removeBOM` 选项禁用，否则 `src()` 将从读取的 UTF-8 文件中删除BOMs。

### 用法

```JS
const { src, dest } = require('gulp');

function copy() {
  return src('input/*.js')
    .pipe(dest('output/'));
}

exports.copy = copy;
```

### 函数原型

```JS
src(globs, [options])
```

### 参数

| 参数    | 类型         | 描述                                                         |
| ------- | ------------ | ------------------------------------------------------------ |
| globs   | string array | [Globs](https://www.gulpjs.com.cn/docs/api/concepts#globs) to watch on the file system. |
| options | object       | 在下面的[选项](https://www.gulpjs.com.cn/docs/api/src/#options)中详细说明。 |

### 多种路径的指令

1. 选中文件夹内文件,不包含子文件夹内的文件

   ```js
   function indexFn(){
       return gulp.src(["src/*"]).pipe(gulp.dest("server"));
   }
   ```

2. 选中文件夹内**所有文件**(包含子文件夹内的文件)

   ```js
   function indexFn(){
       return gulp.src(["src/**/*"]).pipe(gulp.dest("server"));
   }
   ```

3. 选中文件夹内所有指定后缀名的文件

   ```js
   function indexFn(){
       return gulp.src(["src/*.html"]).pipe(gulp.dest("server"));
   }
   ```

4. 选中文件夹内所有指定了**某几个后缀名**的文件

   ```js
   function indexFn(){
       return gulp.src(["src/*.{html,css}"]).pipe(gulp.dest("server"));
   }
   ```

5. 选中文件夹内所有文件**除了某个文件**

   ```js
   function indexFn(){
       return gulp.src(["src/**/**","!src/pass.txt"]).pipe(gulp.dest("server"));
   }
   ```

   



### 返回值

返回一个可以在管道的开始或中间使用的流，用于根据给定的 globs 添加文件。

### 可能出现的错误

当 `globs` 参数只能匹配一个文件(如 `foo/bar.js`)而且没有找到匹配时，会抛出一个错误，提示 "File not found with singular glob"。若要抑制此错误，请将 `allowEmpty` 选项设置为 `true`。

当在 `globs` 中给出一个无效的 glob 时，抛出一个错误，并显示 "Invalid glob argument"。



## dest()

创建一个用于将 [Vinyl](https://www.gulpjs.com.cn/docs/api/concepts#vinyl) 对象写入到文件系统的流。

### 用法

```JS
const { src, dest } = require('gulp');

function copy() {
  return src('input/*.js')
    .pipe(dest('output/'));
}

exports.copy = copy;
```

### 函数原型

```JS
dest(directory, [options])
```

### 参数

| 参数                     | 类型            | 描述                                                         |
| ------------------------ | --------------- | ------------------------------------------------------------ |
| directory **(required)** | string function | 将写入文件的输出目录的路径。如果使用一个函数，该函数将与每个 Vinyl 对象一起调用，并且必须返回一个字符串目录路径。 |
| options                  | object          | 详情见下文[选项](https://www.gulpjs.com.cn/docs/api/dest/#%E9%80%89%E9%A1%B9)。 |

### 返回值

返回一个可以在管道的中间或末尾使用的流，用于在文件系统上创建文件。

每当 Vinyl 对象通过流被传递时，它将内容和其他细节写到给定目录下的文件系统。如果 Vinyl 对象具有 `symlink` 属性，将创建符号链接（symbolic link）而不是写入内容。创建文件后，将[更新其元数据](https://www.gulpjs.com.cn/docs/api/dest/#metadata-updates)以匹配 Vinyl 对象。

在文件系统上创建文件时，Vinyl 对象将被修改。

- `cwd`、`base` 和 `path` 属性将被更新以匹配创建的文件。
- `stat` 属性将被更新，以匹配文件系统上的文件。
- 如果 `contents` 属性是一个流，它将被重置，以便可以再次读取。

### 可能出现的错误

当目录为空字符串时，将抛出一个错误，并提示 "Invalid dest() folder argument. Please specify a non-empty string or a function."（无效的 dest() 文件夹参数。请指定非空字符串或函数。）

当目录不是字符串或函数时，将抛出一个错误，并提示 "Invalid dest() folder argument. Please specify a non-empty string or a function."

当 `directory` 是一个返回空字符串或 `undefined` 的函数时，将发出一条错误消息 “Invalid output folder”。



## parallel()

将任务功能和/或组合操作组合成同时执行的较大操作。对于使用 `series()` 和 `parallel()` 进行嵌套组合的深度没有强制限制。

### 用法

```
const { parallel } = require('gulp');

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.build = parallel(javascript, css);
```

### 函数原型

```
parallel(...tasks)
```

### 参数

| 参数                 | 类型            | 注解                                                         |
| -------------------- | --------------- | ------------------------------------------------------------ |
| tasks **(required)** | function string | 任意数量的任务函数都可以作为单独的参数传递。如果您以前注册过任务，可以使用字符串，但不建议这样做。 |

### 返回值

返回一个组合操作，它将注册为任务或嵌套在其他 `series` 和/或 `parallel` 组合中。

当执行组合操作时，所有任务将以最大并发性运行。如果一个任务发生错误，其他任务可能不确定地完成，也可能不完成。

### 可能出现的错误

当没有传递任何任务时，抛出一个错误，并提示 "One or more tasks should be combined using series or parallel"。（一个或多个应该使用 series 或 parallel 组合的任务”。）

当传递无效的任务或未注册的任务时，将抛出一个错误，显示 "Task never defined"（任务从未定义）。

### 向前引用（Forward references）

向前引用是指使用尚未注册的字符串引用组合任务。在旧版本中，这是一种常见的实践，但是为了实现更快的任务运行时间和促进使用命名函数，删除了该特性。

在较新的版本中，如果尝试使用向前引用，将会得到一个错误，消息为 “Task never defined”。当您尝试为您的任务注册*和*按字符串组合任务使用 `exports` 时，可能会遇到这种情况。在这种情况下，使用命名函数而不是字符串引用。

在迁移期间，您可能需要使用 [forward reference registry](https://github.com/gulpjs/undertaker-forward-reference)。这将为每个任务引用添加一个额外的闭包，并显著降低构建速度。**不要太长时间依赖这个修复程序**。

### 避免重复任务

当一个组合操作执行时，每个任务（task）的每次调用都将被执行。

在两个不同的组合中引用的 `clean` 任务将运行两次，将导致不期望的结果。因此，建议在最终的组合中指定 `clean` 任务。

如果你有如下代码：

```JS
// This is INCORRECT
const { series, parallel } = require('gulp');

const clean = function(cb) {
  // body omitted
  cb();
};

const css = series(clean, function(cb) {
  // body omitted
  cb();
});

const javascript = series(clean, function(cb) {
  // body omitted
  cb();
});

exports.build = parallel(css, javascript);
```

可转换为：

```JS
const { series, parallel } = require('gulp');

function clean(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  // body omitted
  cb();
}

exports.build = series(clean, parallel(css, javascript));
```


## watch()

监听 globs 并在发生更改时运行任务。任务与任务系统的其余部分被统一处理。

### 用法

```
const { watch } = require('gulp');

watch(['input/*.js', '!input/something.js'], function(cb) {
  // body omitted
  cb();
});
```

### 函数原型

```
watch(globs, [options], [task])
```

### 参数

| 参数                 | 类型            | 描述                                                         |
| -------------------- | --------------- | ------------------------------------------------------------ |
| globs **(required)** | string array    | [Globs](https://www.gulpjs.com.cn/docs/api/concepts#globs) 用来监听文件系统。 |
| options              | object          | 详情参见下文 [选项](https://www.gulpjs.com.cn/docs/api/watch/#options) |
| task                 | function string | 一个 [任务函数](https://www.gulpjs.com.cn/docs/api/concepts#tasks) 或由 `series()` 和 `parallel()` 生成的组合任务 |

### 监视多个文件

1. 对一个文件进行监视,并执行不同的函数

   ```js
   // 多个监听的指令
   function f1() {
       console.log("f1")
   }
   
   function f2() {
       console.log("f2")
   }
   
   function f3() {
       console.log("f3")
   }
   
   unction watchAllFn() {
       gulp.watch(["src/index.html"], indexFn)
       gulp.watch(["src/index.html"], f1)
       gulp.watch(["src/index.html"], f2)
       gulp.watch(["src/index.html"], f3)
   }
   exports.watchAll = watchAllFn;
   ```

   

2. 对多个文件进行监视,并执行函数

   ```js
   function watchFn() {
       gulp.watch(["src/index.html"], indexFn)
       gulp.watch(["src/css/index.css"], indexFn)
       gulp.watch(["src/css/public.css"], indexFn)
       gulp.watch(["src/js/index.js"], indexFn)
   }
   ```

   

### 返回值

[chokidar](https://www.gulpjs.com.cn/docs/api/watch/#chokidar-instance) 的一个实例，用于对监听设置进行细粒度控制。

### 可能出现的错误

当以 `globs` 形式传递非字符串或带有任何非字符串的数组时，将抛出一个错误，并提示 "Non-string provided as watch path"。

当字符串或数组作为 `task` 传递时，会抛出一个错误，提示 "watch task has to be a function (optionally generated by using gulp.parallel or gulp.series)"（ watch 任务必须是一个函数(可以选择使用 gulp.parallel 或 gulp.series 生成))。