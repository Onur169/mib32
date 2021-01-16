let Crawler = require("simplecrawler");
let cheerio = require ("cheerio");

// initiate Crawler
let crawler = new Crawler('https://www.nabu.de/umwelt-und-ressourcen/index.html');
crawler.maxDepth = 2;

// check Connection
crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    console.log(queueItem.url);
    console.log(response.statusCode);
});

// crawl through LI Elements > DIV Elements
crawler.discoverResources = function(buffer, queueItem) {
    var $ = cheerio.load(buffer.toString("utf8"));

    return $("li[class] > div").map(function () {
        crawler.filter('.image').first();
        console.log($(this).filter("class"));
        return $(this).attr("class");
    }).get();

};

crawler.start();