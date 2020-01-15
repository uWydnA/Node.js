# MongoDb nosql封装

## 完整实例

```js
module.exports = {
    insert(options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            options.data = options.data || [];
            options.colname.insertMany(options.data, (err) => {
                err ? reject(err) : resolve();
            })
        })
    },
    update(options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            options.where = options.where || {};
            options.newdata = options.newdata || {};
            options.type = options.type || 1;
            options.type = options.type === 1 ? "updateOne" : "updateMany";
            options.colname[options.type](options.where, options.newdata, (err) => {
                err ? reject(err) : resolve();
            })
        })
    },
    delete(options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            options.type = options.type || 1;
            options.type = options.type === 1 ? "deleteOne" : "deleteMany";
            options.where = options.where || {};
            options.colname[options.type](options.where, (err) => {
                err ? reject(err) : resolve();
            });
        })
    },
    find(options) {
        return new Promise((resolve, reject) => {
            options = options || {};
            options.where = options.where || {};
            options.show = options.show || {
                _id: 0,
                __v: 0
            };
            options.setting = options.setting || {};
            let find = options.colname.find(options.where, options.show, (ere, data) => {
                if (data.length != undefined) {
                    let arr = [];
                    data.forEach((val) => {
                        arr.push(val._doc);
                    })
                    resolve(arr)
                } else {
                    reject(data);
                }
            });
            if (typeof options.setting.sort === "object") {
                find.sort(options.setting.sort);
            }
            if (typeof options.setting.limit === "number") {
                find.limit(options.setting.limit);
            }
            if (typeof options.setting.skip === "number") {
                find.skip(options.setting.skip);
            }
        })
    }
}
```



## insert

```js
insert(options) {
    options = options || {};
    return new Promise((resolve, reject) => {
        options.data = options.data || [];
        options.colname.insertMany(options.data, (err) => {
            err ? reject(err) : resolve();
        })
    })
}
```



## update

```js
update(options) {
    options = options || {};
    return new Promise((resolve, reject) => {
        options.where = options.where || {};
        options.newdata = options.newdata || {};
        options.type = options.type || 1;
        options.type = options.type === 1 ? "updateOne" : "updateMany";
        options.colname[options.type](options.where, options.newdata, (err) => {
            err ? reject(err) : resolve();
        })
    })
}
```



## delete

```js
delete(options) {
    return new Promise((resolve, reject) => {
        options = options || {};
        options.type = options.type || 1;
        options.type = options.type === 1 ? "deleteOne" : "deleteMany";
        options.where = options.where || {};
        options.colname[options.type](options.where, (err) => {
            err ? reject(err) : resolve();
        });
    })
}
```



## find

```js
find(options) {
    return new Promise((resolve, reject) => {
        options = options || {};
        options.where = options.where || {};
        options.show = options.show || {
            _id: 0,
            __v: 0
        };
        options.setting = options.setting || {};
        let find = options.colname.find(options.where, options.show, (ere, data) => {
            if (data.length != undefined) {
                let arr = [];
                data.forEach((val) => {
                    arr.push(val._doc);
                })
                resolve(arr)
            } else {
                reject(data);
            }
        });
        if (typeof options.setting.sort === "object") {
            find.sort(options.setting.sort);
        }
        if (typeof options.setting.limit === "number") {
            find.limit(options.setting.limit);
        }
        if (typeof options.setting.skip === "number") {
            find.skip(options.setting.skip);
        }
    })
}
```

