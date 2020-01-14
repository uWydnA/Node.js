# node处理ajax

## 路由

> 路由就是URL到函数的映射

​	通过用户请求的url导航到具体的html页面；每跳转到不同的URL，都是重新访问服务端，然后服务端返回页面，页面也可以是服务端获取数据，然后和模板组合，返回HTML，也可以是直接返回模板HTML，然后由前端js再去请求数据，使用前端模板和数据进行组合，生成想要的HTML

## get方式

### 实现方法

1. 前端getajax的网址为：http://127.0.0.2/api（首先后端确定下来一个pathname用于捕捉ajax）
2. 利用url.parse(req.url).pathname判断pathname是否为"api"(或其他确定好的`暗号`)
3. url.parse(req.url,true)，第二个参数true可以把url.parse(req.url)返回的对象身上的query属性的值变成一个对象，便于我们操作
4. 通过res.write向前端返回数据
5. res.end()结束请求



### 封装

```js
function getAjax(req, res) {
    const u = url.parse(req.url, true);
    res.write(`这是node接收到的get的数据，现在又还给你了：${u.query.user}---${u.query.pass}`);
    res.end()
}
```

### 完整封装

```js
const http = require("http");
const fs = require("fs");
const url = require("url");
http.createServer((req, res) => {
    if (req.url !== "/favicon.ico") {
        var urlobj = url.parse(req.url);
        if (urlobj.pathname === "/api") {
            getAjax(req, res);
        } else {
            fsHandle(req, res);
        }
    }
}).listen("8888", "127.0.0.2", () => {
    console.log("ok,http://127.0.0.2:8888")
})

function getAjax(req, res) {
    const u = url.parse(req.url, true);
    res.write(`这是node接收到的get的数据，现在又还给你了：${u.query.user}---${u.query.pass}`);
    res.end()
}

function fsHandle(req, res) {
    var path = "." + req.url;
    fs.readFile(path, (err, data) => {
        if (err === null) {
            res.write(data);
        } else {
            res.write("404");
        }
        res.end()
    })
}
```





## post方式

### 实现方法

1. 前端postajax的网址为：http://127.0.0.2/api（首先后端确定下来一个pathname用于捕捉ajax）

2. 利用url.parse().pathname判断pathname是否为"api"(或其他确定好的`暗号`)

3. 前端发送的post数据密包通过req.on()时间进行捕获

   ```js
   req.on("data", (d) => {
       str += d;
   })//每次捕获到的数据通过字符串拼接到str上
   ```

   ```js
   req.on("end", () => {
       const data = querystring.parse(str);
       res.write(`${data.user}-----${data.pass}`);
       res.end();
   }）//on绑定的"end"事件为data传输的最后一次，callback在post异步传输完成后执行
   ```

   

### 封装

```js
function postAjax(req, res) {
    let str = "";
    req.on("data", (d) => {
        str += d;
    })
    req.on("end", () => {
        const data = querystring.parse(str);
        res.write(`${data.user}-----${data.pass}`);
        res.end();
    })
}
```





## get/post整合

### 实现方法

1. 通过先检查post异步时间，判断str是否为空，因为如果是get方式发送的数据，str必为空字符，因为get不会触发on事件中的`str += d;`
2. 在end时间中，判断str是非为空，去判定是GET还是POST，从而处理数据。


### 封装

```js
function ajaxHandle(req,res){
    // get、post
    let str = "";
    req.on("data",(d)=>{
        str += d;
    })
    req.on("end",()=>{
        // post数据的解析
        let data = querystring.parse(str);
        // 如果post数据在解析之前，为空字符
        if(!str){
            // 那么就去解析get数据
            data = url.parse(req.url,true).query;
        }
        // 无论是get和post，都一视同仁，因为数据都已经被解析成对象了
        res.write(`这是node接收的数据：${data.user}-${data.pass}`);
        res.end();
    })
}
```



### 完整源码

```js
const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
http.createServer((req, res) => {
    if (req.url !== "/favicon.ico") {
        var urlobj = url.parse(req.url);
        if (urlobj.pathname !== "/api") {
            fshaddle(req, res);
        } else {
            ajax(req, res);
        }
    }
}).listen("8888", "127.0.0.2", () => {
    console.log('ok,http://127.0.0.2:8888');
})

function ajax(req, res) {
    let str = "";
    req.on("data", (d) => {
        str += d;
    })
    req.on("end", () => {
        let data = querystring.parse(str);
        if (!str) {
            data = url.parse(req.url, true).query;
        }
        res.write(`${data.user}-----${data.pass}`);
        res.end();
    })
}

function fshaddle(req, res) {
    var path = "." + req.url;
    fs.readFile(path, (err, data) => {
        if (err === null) {
            res.write(data);
        } else {
            res.write("404");
        }
        res.end()
    })
}
```

