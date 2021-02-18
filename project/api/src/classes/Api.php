<?php

namespace App\Classes;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Api
{

    public function __construct(Request $request)
    {
        var_dump($request);
    }

    public function getNextPageUrl() {
        return "";
    }

}
