# Node连接mongoDB

## 下载模块

```
npm install mongoose@4.11.0 -S
```



## 引入模块

```js
const mongoose = require("mongoose")
```



## 连接并选择数据库

连接mongodb并选择指定数据库：dbName

```js
mongoose.connect("mongodb://localhost:27017/dbName"); 
```

连接成功

```js
mongoose.connection.on("connected",()=>{ })
```

连接断开

```js
mongoose.connection.on("disconnected",()=>{ })
```

连接错误

```js
mongoose.connection.on("error",()=>{ })
```

连接成功之后，将该模块暴露出来：

```js
module.exports = mongoose
```



## 创建集合

引入数据库的链接

```js
const mongoose = require("./db.js");
```

创建集合需要使用的通用对象

说明集合需要使用的字段和类型

```js
const user = new mongoose.Schema({
    user:String,
    pass:String,
    age:Number,
    sex:Boolean
})
```

创建集合后，将该模块暴露出来

```
module.exports = mongoose.module("collectionName",user);
```

## 插入数据 

> 引入创建集合（在创建集合中，引入了连接数据库）

```js
const User = require("./users.js");    
```

插入语法：

插入单条数据：`User.insertMany({}, (err)=>{})`

插入多条数据：`User.insertMany([{},{},…], (err)=>{})`



**注意：数据操作，属于异步操作，需要在回调函数中查看插入结果**

 

## API

### mongoose.connect

> 你可以使用 `mongoose.connect()` 方法连接 MongoDB

```js
mongoose.connect('mongodb://localhost/myapp');
```

这是连接到本地 `myapp` 数据库默认接口(27017)的最小配置, 本地连接失败可以尝试连接 127.0.0.1 local hostname 被修改有时候会引起问题。

你也可以在 `uri` 中指定多个参数：

```js
mongoose.connect('mongodb://username:password@host:port/database?options...');
```



### mongoose.connection

Connection ready state

- 0 = disconnected
- 1 = connected
- 2 = connecting
- 3 = disconnecting

Each state change emits its associated event name.

#### 实例

```js
mongoose.connection.on("connected",()=>{
    console.log("连接成功")
})
mongoose.connection.on("error",()=>{
    console.log("连接报错")
})
mongoose.connection.on("disconnected",()=>{
    console.log("连接断开");
})
```



### mongoose.Schema	

Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。

#### 定义一个schema

Mongoose 的一切始于 Schema。每个 schema 都会映射到一个 MongoDB collection ，并定义这个collection里的文档的构成。

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});
```

在这之后你还想添加 keys 的话， 请使用 [Schema#add](http://www.mongoosejs.net/docs/api.html#schema_Schema-add) 方法。

document 里每个属性的类型都会被转换为 在 `blogSchema` 里定义对应的 [SchemaType](http://www.mongoosejs.net/docs/api.html#schematype_SchemaType)。 例如 `title` 属性会被转换为 SchemaType [String](http://www.mongoosejs.net/docs/api.html#schema-string-js)， 而 `date`属性会被转换为 SchemaType `Date`。 还可以像上面 `meta` 属性，更详细地指定嵌套在里面的属性类型。

允许使用的 SchemaTypes 有:

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array



### mongoose.model

> [Models](http://www.mongoosejs.net/docs/api.html#model-js) 是从 `Schema` 编译来的构造函数。 
>
> 它们的实例就代表着可以从数据库保存和读取的 [documents](http://www.mongoosejs.net/docs/documents.html)。 从数据库创建和读取 document 的所有操作都是通过 model 进行的。

我们要把 schema 转换为一个 [Model](http://www.mongoosejs.net/docs/models.html)， 使用 `mongoose.model(modelName, schema)` 函数

```js
var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);
```

第一个参数是跟 model 对应的集合（ collection ）名字的 *单数* 形式。 **Mongoose 会自动找到名称是 model 名字 复数 形式的 collection** 。 对于上例，Tank 这个 model 就对应数据库中 **tanks** 这个 collection。`.model()` 这个函数是对 `schema` 做了拷贝（生成了 model）。 你要确保在调用 `.model()` 之前把所有需要的东西都加进 `schema` 里了！



### model.insertMany()

### model.update()

```js
model.update({key:val},{key:newval},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("ok");
    }
})
```



### model.updateOne()

```js
model.updateOne({key:val},{key:newval},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("ok");
    }
})
```



### model.updateMany()

```js
model.updateMany({key:val},{key:newval},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("ok");
    }
})
```

自增自减

```js
uesr.updateMany({sex:false},{$inc:{age:-1}},(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("updata ok")
    }
})
```



