const {
    watch,
    series,
    src,
    dest
} = require('gulp');
const rename = require("gulp-rename");

const entryJsFiles = './src/**/*.js';

function jsTask() {

    return src(entryJsFiles)
        .pipe(rename(function (path) {
            path.basename += ".user";
        }))
        .pipe(dest('dist/'));

}

function defaultTask(cb) {

    watch(entryJsFiles, series(jsTask));
    cb();
}

exports.default = defaultTask