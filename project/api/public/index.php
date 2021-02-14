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
use App\Middleware\CorsMiddleware;
use DI\Container;
use Psr\Container\ContainerInterface;
use Slim\Factory\AppFactory;
use App\Routes\EventController;
use Slim\Routing\RouteCollectorProxy;

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
    $container->set('Database', function (ContainerInterface $container) use ($config) {

        return new Database($config);

    });

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

    // Middleware
    $app->add(new CorsMiddleware());

    // Routen definieren
    $app->group('/climatestrike', function (RouteCollectorProxy $group) {

        $group->get('/events', EventController::class . ':get');
        $group->post('/events', EventController::class . ':add');

    });

    // App starten
    $app->run();

} catch (\Throwable $th) {

    echo $th->getMessage();

}
