<?php

namespace App\Routes;

use App\Classes\Database;
use App\Classes\Helper;
use App\Classes\Response as ResponseBuilder;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ModulesController
{

    private $db;
    private $helper;

    public function __construct(Database $db)
    {
        $this->db = $db;
        $this->helper = new Helper();
    }

    public function add(Request $request, Response $response, array $args): Response
    {

        try {

            $guidv4 = $this->helper->guidv4();
            $name = "HelloWorld";
            $description = "Das ist eine Beschreibung!";
            $jsCode = 'console.log("HelloWorldModule")';
            $htmlCode = '<div>HalloWelt!</div>';

            $insertId = $this->db->insert("modules", ["id", "name", "description", "js_code", "html_code"], [$guidv4, $name, $description, $jsCode, $htmlCode]);

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, [
                ResponseBuilder::INSERT_ID_RESPONSE_KEY => $insertId
            ]);

        } catch (\Throwable $th) {

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::ERROR_RESPONSE_KEY, [
                ResponseBuilder::CODE_RESPONSE_KEY => $th->getCode(),
                ResponseBuilder::MSG_RESPONSE_KEY => $th->getMessage()
            ]);

        } finally {

            $response->getBody()->write($jsonResponse);

            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);

        }

    }

}
