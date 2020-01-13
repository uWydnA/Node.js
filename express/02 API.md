# API

## Application

### app.use()

#### 语法

```js
app.use([path,] callback [, callback...])
```

#### 实例

```js
app.use("/index",(req,res)=>{
    res.send("首页")
})
```

```js
app.use("index",(req,res,next)=>{
    console.log(req.url);
    next();//执行完会在继续执行下面的app.use()语句
})
app.use("index",(req,res)=>{
    res.send(req.url);
})
```



### app.get()

#### 语法

```js
app.get(path, callback [, callback ...])
```

#### 实例

```
app.get("/form", (req, res) => {
    console.log("1");
    res.send("hello form");
})
```



### app.post()

#### 语法

```js
app.post(path, callback [, callback ...])
```

#### 实例

```js
app.post("/form", (req, res) => {
    console.log("1");
    res.send("hello form");
})
```



## Request

### req.query(GET)

> 此属性是一个对象，其中包含路由中的每个查询字符串参数的属性。如果没有查询字符串，它就是空对象

#### 实例

```js
// GET /search?q=tobi+ferret
console.dir(req.query.q)
// => 'tobi ferret'

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
console.dir(req.query.order)
// => 'desc'

console.dir(req.query.shoe.color)
// => 'blue'

console.dir(req.query.shoe.type)
// => 'converse'

// GET /shoes?color[]=blue&color[]=black&color[]=red
console.dir(req.query.color)
// => ['blue', 'black', 'red']
```



### req.body(POST)

> 包含在请求正文中提交的键/值数据对。默认情况下，它是`undefined`
>
> 在使用诸如`express.json()`,`express.urlencoded()`解析后可填充
>
> 在使用诸如body-parser的中间件可填充

#### 实例

使用express.json()和express.urlencoded()解析json和application/x-www-form-urlencoded

```js
var express = require('express')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/profile', function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
})
```

使用body-parser中间件解析

```js
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(bodyparser());
app.post("/api",(req,res)=>{
    console.log(req.body)
})
```

