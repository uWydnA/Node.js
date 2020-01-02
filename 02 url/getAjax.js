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