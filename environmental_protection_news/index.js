let Crawler = require("simplecrawler");
let cheerio = require ("cheerio");
// initiate Crawler
let crawler = new Crawler('https://www.nabu.de/umwelt-und-ressourcen/index.html');
// crawler.maxDepth = 2;
crawler.maxConcurrency = 2;


        /*
        {

            image: "bla image",
            headline: "bla headline",
            preview_text: "bla preview text",
            external_page: "bla exteral page"

        }
        */

    /*
crawler.discoverResources = function(buffer, queueItem) {

    var $ = cheerio.load(buffer.toString("utf8"));

    return $(".column .image .slide").map(function () {


        return $(this).attr("href");
        
    }).get();


};
*/

crawler.discoverResources = function(buffer, queueItem) {

    let news = [];

    var $ = cheerio.load(buffer.toString("utf8"));

    console.log($(".slide"));

    //console.log(news);
    
};

crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {



    //console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    //console.log("It was a resource of type %s", response.headers['content-type']);

});


crawler.start();




