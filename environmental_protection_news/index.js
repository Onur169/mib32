const DOMAIN = 'https://www.nabu.de/umwelt-und-ressourcen/index.html';

let Crawler = require("simplecrawler");
let cheerio = require ("cheerio");
let fs = require('fs');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// initiate Crawler
let crawler = new Crawler(DOMAIN);
crawler.maxDepth = 2;

let news = [];

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {

    var $ = cheerio.load(responseBuffer.toString("utf8"));

    $('.sudoslider .column').each(function (i, elem) {

        let image = $(this).find("img");
        let hyperlink = $(this).find("h2 a");
        let description = $(this).find("p");
    
        news.push({

            title: hyperlink.text().trim(),
            description: description.contents().first().text().trim(),
            image_url: image.attr("src"),
            external_url: hyperlink.attr("href")

        });

    });

    fs.writeFile('news.json', JSON.stringify(news, null, 2), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    }); 

});



crawler.discoverResources = function(buffer, queueItem) {

    var $ = cheerio.load(buffer.toString("utf8"));

    return $(".slide a[href]").map(function () {
        return $(this).attr("href");
    }).get();

};



crawler.start();