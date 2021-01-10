<?php

    function sanitize_output($buffer) {

        $search = array(
            '/\>[^\S ]+/s',     // strip whitespaces after tags, except space
            '/[^\S ]+\</s',     // strip whitespaces before tags, except space
            '/(\s)+/s',         // shorten multiple whitespace sequences
            '/<!--(.|\s)*?-->/' // Remove HTML comments
        );

        $replace = array(
            '>',
            '<',
            '\\1',
            ''
        );

        $buffer = preg_replace($search, $replace, $buffer);

        return $buffer;

    }

    ob_start("sanitize_output");

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minify Example</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">
</head>

<body>

    <section class="hero is-primary">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">MIB32 Userscripts - Gruppe B</h1>
                <p class="subtitle">Team: Onur Sahin, Christian Knoth, Dustin Bastke, Anna Glomb, Stefanie Roddeck</p>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <div class="columns is-multiline">
                <div class="column is-full">
                    <p>Die Ausgabe der gesamten Seite wird minified!</p>
                </div>
            </div>
        </div>
    </section>

</body>

</html>