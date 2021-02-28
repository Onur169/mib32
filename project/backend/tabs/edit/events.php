<?php

require_once __DIR__ . '/../../vendor/autoload.php';

$form = new Formr\Formr('bulma');

$form->create_form('Name, Email, Comments|textarea');