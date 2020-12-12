const fs = require('fs');
const {
    watch,
    series,
    src,
    dest
} = require('gulp');
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const mergeStream =   require('merge-stream');
const insert = require("gulp-insert");

const distFolder = 'dist/';
const entryJsFiles = './src/*.js';

function jsTask() {

   /*
    Bug: all.js kann nicht den Namen der veränderten Datei bekommen
    Fix in clean()
   */

    let frameworkContent = fs.readFileSync("./src/framework/uludag.js", 'utf-8');

    return src(entryJsFiles)
        .pipe(insert.prepend(frameworkContent + '\n\n'))
        .pipe(rename(function (path) {
            path.basename += ".user";
        }))
        //.pipe(concat("all.js"))
        .pipe(dest(distFolder));

}

function createUserscriptsListingFileTask(cb) {
    
    let templateBuilder = buttons => {

        return `
    
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Userscripts installieren</title>
            </head>
            <body>
                ${buttons}
            </body>
            </html>

        `;

    };

    let buttons = [];

    fs.readdir(distFolder, (err, files) => {

        files.forEach(file => {
            buttons.push(`<a href="https://localhost:3000/dist/${file}">${file}</a> <br>`);
        });

        let htmlContent = templateBuilder(buttons);
        fs.writeFile('install.html', htmlContent, cb);

    });


}

function defaultTask(cb) {

    watch(entryJsFiles, series(jsTask, createUserscriptsListingFileTask));
    cb();
}

exports.default = defaultTask