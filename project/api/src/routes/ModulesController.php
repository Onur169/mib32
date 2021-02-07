<?php

namespace App\Routes;

use App\MaintenanceDatabase;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Classes\Response as ResponseBuilder;

class ModulesController
{

    public function add(Request $request, Response $response, array $args): Response
    {

        $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, [
            'name' => 'Bob', 
            'age' => 40 
        ]);
        
        $response->getBody()->write($jsonResponse);

        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);


    }

}
