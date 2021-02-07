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

use App\Classes\Helper;
use App\Classes\Database;
use App\Middleware\CorsMiddleware;
use App\Routes\ModulesController;

use Slim\Exception\NotFoundException;
use Slim\Factory\AppFactory;
use DI\Container;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Container\ContainerInterface;

// Create Container using PHP-DI
$container = new Container();

// Set container to create App with on AppFactory
AppFactory::setContainer($container);
$app = AppFactory::create();

/**
 * The routing middleware should be added earlier than the ErrorMiddleware
 * Otherwise exceptions thrown from it will not be handled by the middleware
 */
$app->addRoutingMiddleware();

$logger = NULL;
$errorMiddleware = $app->addErrorMiddleware(true, true, true, $logger);

// Helper
$helper = new Helper();

try {

    // Get Basepath
    $basePathArr = $helper->htaccess("./", "RewriteBase");
    $basePath = trim(explode(" ", $basePathArr[0])[1]);

    // Get config data
    $config = json_decode(file_get_contents(__DIR__ . "/../config.json"), true);

} catch (\Throwable $th) {

    echo $th->getMessage();

}

// Set Basepath
$app->setBasePath($basePath);

// Middleware
$app->add(new CorsMiddleware());

// Set Services (DI)
$container->set('ModulesController', function () use ($config) {
    
    $db = new Database();
    $db->init($config);

    return new ModulesController($db);

});

// Routen definieren
$app->get('/climatestrike/modules', ModulesController::class . ':get');
$app->post('/climatestrike/modules', ModulesController::class . ':add');

// App starten
$app->run();
