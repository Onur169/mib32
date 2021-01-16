let Crawler = require("simplecrawler");
let cheerio = require("cheerio");

// initiate Crawler
let crawler = new Crawler('https://www.nabu.de/umwelt-und-ressourcen/index.html');

crawler.maxConcurrency = 2;


crawler.discoverResources = function(buffer, queueItem) {

    let news = [];

    var $ = cheerio.load(buffer.toString("utf8"));

    console.log($, "eee");

    //console.log(news);
    
};

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {



    console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    //console.log("It was a resource of type %s", response.headers['content-type']);

});


crawler.start();