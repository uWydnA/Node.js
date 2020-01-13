# EJS

> EJS 是一套简单的模板语言，帮你利用普通的 JavaScript 代码生成 HTML 页面。

## 入门

### 安装

利用 NPM 安装 EJS 很简单。

```
$ npm install ejs
```

### 用法

将模板字符串和一些数据作为参数传递给 EJS，Duang，HTML 出来了。

```
let ejs = require('ejs'),
    people = ['geddy', 'neil', 'alex'],
    html = ejs.render('<%= people.join(", "); %>', {people: people});
```

### 浏览器支持

从这里下载 [最新的浏览器版本](https://github.com/mde/ejs/releases/latest)，然后引入页面即可。

```
<script src="ejs.js"></script>
<script>
  let people = ['geddy', 'neil', 'alex'],
      html = ejs.render('<%= people.join(", "); %>', {people: people});
</script>
```



## 文档

### 实例

```html
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
```

### 用法

```js
let template = ejs.compile(str, options);
template(data);
// => 输出渲染后的 HTML 字符串

ejs.render(str, data, options);
// => 输出渲染后的 HTML 字符串

ejs.renderFile(filename, data, options, function(err, str){
    // str => 输出渲染后的 HTML 字符串
});
```

### 标签含义

- `<%` '脚本' 标签，用于流程控制，无输出。
- `<%_` 删除其前面的空格符
- `<%=` 输出数据到模板（输出是转义 HTML 标签）
- `<%-` 输出非转义的数据到模板
- `<%#` 注释标签，不执行、不输出内容
- `<%%` 输出字符串 '<%'
- `%>` 一般结束标签
- `-%>` 删除紧随其后的换行符
- `_%>` 将结束标签后面的空格符删除



### 包含（include）

通过 `include` 指令将相对于模板路径中的模板片段包含进来。(需要提供 'filename' 参数。) 例如，如果存在 "./views/users.ejs" 和 "./views/user/show.ejs" 两个模板文件，你可以通过 `<%- include('user/show'); %>` 代码包含后者。

你可能需要能够输出原始内容的标签 (`<%-`) 用于 include 指令，避免对输出的 HTML 代码做转义处理。

```html
<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}); %>
  <% }); %>
</ul>
```



### 循环

#### views/index.ejs

```html
 <%  for(var i=0;i<arr.length;i++){ %>
  <p><%= arr[i] %></p>
  <% } %>
```

#### routers/index.js

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    arr: ["a", "b", "c", "d", "e"],//这条键值对定义上面的arr
  });
});

module.exports = router;
```



### 分支

#### views/index.ejs

```html
<% if(flag) {%>
	<p>true<p>
<% }else{ %>
    <p>flase</p>
<% } %>
```

#### routers/index.js

```js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
   flag:1
  });
});

module.exports = router;
```

