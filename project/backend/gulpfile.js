const fs = require('fs');
const {
    watch,
    series,
    parallel,
    src,
    dest
} = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

const distFolder = './dist/';
const entryJsFiles = './src/js/**/*.{js,ts}';
const entrySassFiles = './src/scss/**/*.scss';

function jsTask() {

    return src(entryJsFiles)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest(distFolder));

}

function sassTask() {

    return src(entrySassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(distFolder));

}


function defaultTask(cb) {

    watch(entrySassFiles, parallel(sassTask));
    watch(entryJsFiles, parallel(jsTask));
    cb();
}

exports.default = defaultTask;