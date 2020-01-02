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