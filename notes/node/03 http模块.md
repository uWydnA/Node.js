# http模块

## 引入模块

```js
const http = require("http");
```



## http.createServer()

### 返回值

> 返回新建的 [`http.Server`](http://nodejs.cn/s/jLiRTh) 实例。

```js
const server = http.createServer();
```

### server属性

request对象的属性是：

| 名称        | 含义                                         |
| ----------- | -------------------------------------------- |
| complete    | 描述这个请求信息是不是发送完成了             |
| httpVersion | 描述HTTP协议版本，通常是1.0或者1.1           |
| method      | 描述HTTP请求方法，比如GET,POST,PUT,DELETE等  |
| url         | 描述原始的请求路径                           |
| headers     | 描述HTTP请求头                               |
| trailers    | 描述HTTP请求尾                               |
| connection  | 描述当前的HTTP连接套接字，是net.Socket的实例 |
| socket      | connection属性的别面，套接字                 |
| client      | client属性的别名                             |



### server.listen()

启动 HTTP 服务器监听连接。 此方法与 [`net.Server`](http://nodejs.cn/s/gBYjux) 中的 [`server.listen()`](http://nodejs.cn/s/xGksiu) 相同。



## 实例

```js
// 引入模块
const http = require("http");
// console.log(http);

var httpObj = http.createServer((req,res)=>{
    // 当服务器被访问时，要做的事情
    // console.log(1);
    // 第一个参数：前端到后台的发送头对象
    // 第二个参数：后台到前端的发送头对象
    if(req.url != "/favicon.ico"){
        console.log(req.url)
        // 向前端返回数据
        res.write("hello node");
        // 结束当前请求
        res.end();
    }
})

// 开启监听端口和地址
httpObj.listen("82","127.0.0.2",()=>{
    console.log("服务器开启成功hahahahahha")
})
```





