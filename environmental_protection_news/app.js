let Crawler = require("simplecrawler");
let cheerio = require ("cheerio");

// initiate Crawler
let crawler = new Crawler('https://www.nabu.de/umwelt-und-ressourcen/index.html');
crawler.maxDepth = 2;

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
    console.log(queueItem.url);
    console.log(response.statusCode);
});

crawler.discoverResources = function(buffer, queueItem) {
    var $ = cheerio.load(buffer.toString("utf8"));

    return $("li[class]").map(function () {
        console.log($(this).attr('class'));
        return $(this).attr("class");
    }).get();
};

crawler.start();