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
            postAjax(req, res);
        }
    }
}).listen("8888", "127.0.0.2", () => {
    console.log('ok,http://127.0.0.2:8888');
})

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