# url模块

> `url` 模块用于处理与解析 URL。

## 引入模块

```js
const url = require('url');
```

## parse()

### 语法

```js
url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
```

### 实例

```js
const http = require("http");
// const fs = require("fs");
const url = require("url");
http.createServer((req, res) => {
    if (req.url !== "/favicon.ico") {
        var urlobj = url.parse(req.url);
        console.log(urlobj)
    }
    res.end()
}).listen("8888", "127.0.0.2", () => {
    console.log("ok,http://127.0.0.2:8888")
})
```

输入地址为127.0.0.2:8888后，node中console.log()出了如下对象，以下是在根目录URL的情况下返回的URL对象

```js
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: '/',
  path: '/',
  href: '/'
}
```

地址为127.0.0.2:8888.index.html,node中出现了如下对象：

```js
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: '/index.html',
  path: '/index.html',
  href: '/index.html'
}
```

