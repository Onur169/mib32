<?php

namespace App\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;

use Slim\Psr7\Response as ResponsePsr7;

use App\Exception\ApiException;
use App\Classes\Response as ResponseBuilder;

class AuthMiddleware
{
    const X_AUTH_TOKEN_KEY = 'X-Auth-Token';
    const API_TOKEN = 'f6593626f871c3a479106ba4c770d41d42eee68e';

    public function __invoke(Request $request, RequestHandler $handler): Response
    {

        $jsonResponse = "";
        $response = $handler->handle($request);

        try {

            $xAuthToken = count($request->getHeader(self::X_AUTH_TOKEN_KEY)) > 0 ? $request->getHeader(self::X_AUTH_TOKEN_KEY)[0] : null;

            if($xAuthToken === self::API_TOKEN) {
                return $response;
            } else {
                throw new ApiException(ApiException::AUTH_TOKEN_IS_NOT_VALID);
            }

        } catch (\Throwable $th) {

            $response = new ResponsePsr7();

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
