const gulp = require("gulp");
const connect = require("gulp-connect");

function indexFn(end) {
    gulp.src(["src/index.html"]).pipe(gulp.dest("server")).pipe(connect.reload());
    gulp.src(["src/css/index.css"]).pipe(gulp.dest("server/css")).pipe(connect.reload());
    gulp.src(["src/css/public.css"]).pipe(gulp.dest("server/css")).pipe(connect.reload());
    gulp.src(["src/js/index.js"]).pipe(gulp.dest("server/js")).pipe(connect.reload());
    end();
}

function watchFn() {
    gulp.watch(["src/index.html"], indexFn)
    gulp.watch(["src/css/index.css"], indexFn)
    gulp.watch(["src/css/public.css"], indexFn)
    gulp.watch(["src/js/index.js"], indexFn)
}

function serverFn() {
    connect.server({
        root: "server",
        port: "8888",
        livereload: true
    })
}
exports.index = indexFn;
exports.watch = watchFn;
exports.server = serverFn;
exports.serverWatch = gulp.parallel(serverFn, watchFn)