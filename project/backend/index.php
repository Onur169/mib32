<?php

    require_once 'vendor/autoload.php';

    use App\Classes\Template;

    $form = new Formr\Formr('bulma');

    $m = new \Mustache_Engine(['entity_flags' => ENT_QUOTES]);

    $template = new Template();

    $navContent = @file_get_contents(__DIR__ . "/nav.php");

    $navIterator = [];
    $navIterator['nav'] = $template->getTabs(); 
    $navBar = $m->render($navContent, $navIterator);

    $firstTab = $navIterator['nav'][0]["filename"];
    $currentTab = $_GET["tab"] ?? $navIterator['nav'][0]["filename"];
    $currentTab = $template->isTabRegistered($currentTab) ? $currentTab : $firstTab;
    $currentTabPath = __DIR__ . "/tabs/" . $currentTab . ".php";

?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Climatestrike API Backend</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">
        <style>
            /** Wird alles nach auf scss umgestellt */
            #app {
                padding: 3rem 1.5rem;
            }
            #app #logo {
                margin-bottom: 30px;
                width: 300px;
            }
        </style>
    </head>

    <body class="container" id="app">

        <div class="columns is-multiline is-mobile">
        
            <div class="column is-full">
                <a href="./">
                    <img id="logo" src="https://www.klima-streik.org/typo3conf/ext/user_template_v5/Resources/Public/Images/klima-streik-header-210319.png" alt="Logo">
                </a>
            </div>

            <div class="column is-full"><?php echo $navBar ?></div>

            <div class="column is-full">
                <?php 
                    if(file_exists($currentTabPath)) {
                        include_once __DIR__ . "/tabs/" . $currentTab . ".php";
                    }
                ?>
            </div>

        </div>

    </body>

</html>