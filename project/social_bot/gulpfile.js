const fs = require('fs');
const {
    watch,
    series,
    parallel,
    src,
    dest
} = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

const distFolder = './dist/';
const entryJsFiles = './src/**/*.{js,ts}';

function copyConfigFiles() {
    return src(['./src/*_cookies.json'])
        .pipe(dest(distFolder));
}

function jsTask() {

    return src(entryJsFiles)
        // Puppeteer ist nicht kompatibel mit babel (insbesondere evaluate())
        // https://github.com/puppeteer/puppeteer/issues/1665
        /*
        .pipe(babel({
            presets: ['@babel/env']
        }))
        */
        .pipe(tsProject())
        .pipe(dest(distFolder));

}

function defaultTask(cb) {

    watch(entryJsFiles, parallel(jsTask));
    cb();

}

exports.default = defaultTask;