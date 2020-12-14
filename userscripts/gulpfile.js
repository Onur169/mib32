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
const babel = require('gulp-babel');

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
        .pipe(babel({
            presets: ['@babel/env']
        }))
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
            <title>MIB32 Userscripts - Gruppe B - Team: Onur Sahin, Christian Knoth, Dustin Bastke, Anna Glomb, Stefanie Roddeck</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">
        </head>
        
        <body>
        
            <section class="hero is-primary">
                <div class="hero-body">
                    <div class="container">
                        <h1 class="title">MIB32 Userscripts - Gruppe B</h1>
                        <p class="subtitle">Team: Onur Sahin, Christian Knoth, Dustin Bastke, Anna Glomb, Stefanie Roddeck</p>
                    </div>
                </div>
            </section>
        
            <section class="section">
                <div class="container">
                    <div class="columns is-multiline">
                        ${buttons.join("")}
                    </div>
                </div>
            </section>
        
        </body>
        
        </html>

        `;

    };

    let buttons = [];

    fs.readdir(distFolder, (err, files) => {

        files.forEach(file => {
            buttons.push(`
                <div class="column is-full">
                    <a role="button" class="button" href="https://localhost:3000/dist/${file}">${file}</a>
                </div>
            `);
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