<?php

    require_once 'vendor/autoload.php';

    use App\Classes\Template;
    use App\Classes\Api;

    $form = new Formr\Formr('bulma');

    $m = new \Mustache_Engine(['entity_flags' => ENT_QUOTES]);

    $template = new Template();

    $navContent = @file_get_contents(__DIR__ . "/nav.php");

    $navIterator = [];
    $navIterator['nav'] = $template->getTabs(); 
    $navBar = $m->render($navContent, $navIterator);

    $uri = $_SERVER['REQUEST_URI'];
    $uriParts = explode("/", $uri);

    $firstTab = $navIterator['nav'][0]["filename"];
    $currentTab = $_GET["tab"] ?? $navIterator['nav'][0]["filename"];
    $currentTab = $template->isTabRegistered($currentTab) ? $currentTab : $firstTab;
    $currentTabPath = __DIR__ . "/tabs/" . $currentTab . ".php";

    $api = new Api();
?>
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Climatestrike API Backend</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <link href="/dist/app.css" rel="stylesheet">
        <script src="https://unpkg.com/vue@3.0.0-beta.12/dist/vue.global.js"></script>
    </head>

    <body class="container" >

        <div class="columns is-multiline is-mobile" id="app">

            <div class="pageloader is-bottom-to-top is-active"><span class="title">Pageloader</span></div>

            <div class="column is-full">
                <div class="notification is-info" v-if="!notificationRead">
                    <button class="delete" v-on:click="notificationHasBeenRead()"></button>
                    Du kannst deine Pfeiltasten nutzen, um zwischen den Seiten zu navigieren <br><br>
                    <button class="button is-small" v-on:click="notificationHasBeenRead()">Alles klar!</button>
                </div>
            </div>
        
            <div class="column is-full">
                <a href="./">
                    <!-- <img id="logo" src="https://www.klima-streik.org/typo3conf/ext/user_template_v5/Resources/Public/Images/klima-streik-header-210319.png" alt="Logo"> -->
                    <h1>{{ name }}</h1>
                </a>
            </div>

            <div class="column is-full"><?php echo $navBar ?></div>

            <div class="column is-full">
                <?php 
                    if(file_exists($currentTabPath)) {

                        $currentTabContent = @file_get_contents($currentTabPath);
                        echo $currentTabContent;

                        $response = $api->getRessource($currentTab);
                        $api->injectRessourceDataIntoWindowObject($response);

                    }
                ?>
            </div>

        </div>

    <!-- <script src="/dist/app.js"></script> -->
    <script src="/src/js/app.js"></script>
    <script>
        const mountedApp = app.mount('#app');
    </script>

    </body>

</html>