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
use App\Middleware\CorsMiddleware;
use App\Routes\ModulesController;

use Slim\Factory\AppFactory;
use Slim\Exception\NotFoundException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// Init Slimframework
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

// DB erzeugen
/*
$db = new MaintenanceDatabase();
$parentDirName = basename(pathinfo(__DIR__)["dirname"]);
$dbLocation = $parentDirName . '.db';*/

try {

    $db->init($dbLocation);
    $homeTemplate = "frontend.php";

} catch (\Throwable $th) {


}

// Middleware
//$app->add(new CorsMiddleware());

// Routen definieren
$app->get('/climatestrike/modules', ModulesController::class . ':get');
$app->post('/climatestrike/modules', ModulesController::class . ':add');

// App starten
$app->run();
