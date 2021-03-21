<?php

date_default_timezone_set('Europe/Berlin');
setlocale(LC_ALL, 'de_DE.utf8');

require __DIR__ . '/../vendor/autoload.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

set_error_handler(function ($severity, $message, $filename, $lineno) {

    if (error_reporting() == 0) {
        return;
    }
    if (error_reporting() & $severity) {
        throw new ErrorException($message, 0, $severity, $filename, $lineno);
    }

});

use App\Classes\Database;
use App\Classes\Helper;
use App\Classes\Filter;
use App\Middleware\CorsMiddleware;
use App\Middleware\AuthMiddleware;
use App\Routes\EventController;
use App\Routes\ThrowbackController;
use App\Routes\TestimonialController;
use App\Routes\SocialMediaController;
use App\Routes\AllianceController;
use App\Routes\Utf8izeController;
use DI\Container;
use Psr\Container\ContainerInterface;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;

// Filter
$filter = new Filter();
$filter->register("current_events", 'NOW() < events.start_at', ['events']);
$filter->register("only_facebook", 'social_media_types.name = "facebook"', ['social_media_hashtag_stats']);
$filter->register("only_twitter", 'social_media_types.name = "twitter"', ['social_media_hashtag_stats']);

// Create Container using PHP-DI
$container = new Container();

// Helper
$helper = new Helper();

try {

    // Get Basepath
    $basePathArr = $helper->htaccess("./", "RewriteBase");
    $basePath = trim(explode(" ", $basePathArr[0])[1]);

    // Get config data
    $config = json_decode(file_get_contents(__DIR__ . "/../config.json"), true);

    // Set Container
    $container->set('Database', fn(ContainerInterface $container) => new Database($config));
    $container->set('Filter', fn(ContainerInterface $container) => $filter);
    $container->set('Config', fn(ContainerInterface $container) => $config);

    // Set container to create App with on AppFactory
    AppFactory::setContainer($container);
    $app = AppFactory::create();

    /**
     * The routing middleware should be added earlier than the ErrorMiddleware
     * Otherwise exceptions thrown from it will not be handled by the middleware
     */
    $app->addRoutingMiddleware();

    $logger = null;
    $errorMiddleware = $app->addErrorMiddleware(true, true, true, $logger);

    // Set Basepath
    $app->setBasePath($basePath);

    // Global Middleware
    $app->add(new CorsMiddleware());

    // Middleware
    $authMiddleware = new AuthMiddleware();

    // Routen definieren
    $app->group('climatestrike', function (RouteCollectorProxy $group) use ($authMiddleware) {

        // Event Calls
        $group->get('/events', EventController::class . ':get');
        $group->post('/events', EventController::class . ':add')->add($authMiddleware);
        $group->put('/events/{id}', EventController::class . ':edit')->add($authMiddleware);

        // Throwback Calls
        $group->get('/throwbacks', ThrowbackController::class . ':get');
        $group->put('/throwbacks/{id}', ThrowbackController::class . ':edit')->add($authMiddleware);

        // Testimonal Calls
        $group->get('/testimonials', TestimonialController::class . ':get');
        $group->post('/testimonials', TestimonialController::class . ':add')->add($authMiddleware);

        // Alliance Calls
        $group->get('/alliances', AllianceController::class . ':get');
        $group->post('/alliances', AllianceController::class . ':add')->add($authMiddleware);

        // Social-Media Calls
        $group->post('/socialmedia', SocialMediaController::class . ':add')->add($authMiddleware);
        $group->get('/socialmedia', SocialMediaController::class . ':get');

        // Social-Media-Stat Calls
        $group->post('/socialmedia/{id}/hashtagstat', SocialMediaController::class . ':addStat')->add($authMiddleware);
        $group->get('/socialmedia/hashtagstat', SocialMediaController::class . ':getStat');
        $group->put('/socialmedia/{id}/hashtagstat', SocialMediaController::class . ':editStat')->add($authMiddleware);

    });

    // Routen definieren
    $app->group('tools', function (RouteCollectorProxy $group) use ($authMiddleware) {

        // Tool Calls
        $group->get('/utf8ize', Utf8izeController::class . ':get')->add($authMiddleware);

    });

    // App starten
    $app->run();

} catch (\Throwable $th) {

    echo $th->getMessage();

}
