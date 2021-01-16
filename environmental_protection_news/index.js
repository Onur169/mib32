let Crawler = require("simplecrawler");
let cheerio = require ("cheerio");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// initiate Crawler
let crawler = new Crawler('https://www.nabu.de/umwelt-und-ressourcen/index.html');
crawler.maxDepth = 2;

let result = [];

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {

    var $ = cheerio.load(responseBuffer.toString("utf8"));

    let news = [];

    $('.sudoslider .column').each(function (i, elem) {

        let image = $(this).find("img");
        let hyperlink = $(this).find("a");
        let description = $(this).find("p");
    
        news.push({

            title: hyperlink.text(),
            description: description.text(),
            image_url: image.attr("src"),
            external_url: hyperlink.attr("href")

        });

    });

});



crawler.discoverResources = function(buffer, queueItem) {

    var $ = cheerio.load(buffer.toString("utf8"));

    return $(".slide a[href]").map(function () {
        return $(this).attr("href");
    }).get();

};



crawler.start();