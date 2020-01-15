# MongoDb nosql封装

## 实例

```js
module.exports = {
    insert(colname, data) {
        return new Promise((resolve, reject) => {
            data = data || [];
            colname.insertMany(data, (err) => {
                err ? reject(err) : resolve();
            })
        })
    }
    // update() {

    // }
    // delete() {

    // }
    // find() {

    // }
}
```



## insert

## update

## delete

## find