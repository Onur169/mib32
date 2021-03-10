<?php

namespace App\Routes;

use App\Classes\Api;
use App\Classes\Database;
use App\Classes\Filter;
use App\Classes\Helper;
use App\Classes\ImageManipulator;
use App\Classes\Response as ResponseBuilder;
use App\Classes\Upload;
use App\Exception\UploadException;
use DateTime;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AllianceController
{

    private $db;
    private $filter;
    private $helper;
    private $container;
    private $imageManipulator;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
        $this->helper = new Helper();
        $this->db = $this->container->get('Database');
        $this->filter = $this->container->get('Filter');
        $this->upload = new Upload($this->db);
        $this->imageManipulator = new ImageManipulator();
    }

    public function add(Request $request, Response $response, array $args): Response
    {

        try {

            $params = $request->getQueryParams();
            $now = new DateTime();

            $guidv4 = $this->helper->guidv4();
            $guidv4Medias = $this->helper->guidv4();
            $name = $params["name"];
            $url = $params["url"];
            $createdAt = $now->format('Y-m-d H:i:s');

            $uploadedFiles = $request->getUploadedFiles();
            $mediaToken = sha1($guidv4);
            $insertId = null;
            $mediaInsertId = null;

            if (count($uploadedFiles) > 0) {

                $insertAndMediaId = $this->upload->processUpload($uploadedFiles, $mediaToken, $guidv4, $guidv4Medias, function($guidv4, $mediaInsertId, $createdAt) use ($name, $url) {

                    return $this->db->insert("alliances",
                        ["id", "name", "url", "created_at", "medias_id"],
                        [$guidv4, $name, $url, $createdAt, $mediaInsertId]
                    );
                    
                });

                $insertId = $insertAndMediaId[Upload::INSERT_ID];
                $mediaInsertId = $insertAndMediaId[Upload::MEDIA_INSERT_ID];

            } else {

                $insertId = $this->db->insert("alliances",
                    ["id", "name", "url", "created_at", "medias_id"],
                    [$guidv4, $name, $url, $createdAt, $guidv4Medias]
                );

            }

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, [
                ResponseBuilder::INSERT_ID_RESPONSE_KEY => $insertId,
                ResponseBuilder::MEDIA_INSERT_ID_RESPONSE_KEY => $mediaInsertId,
            ]);

        } catch (\Throwable $th) {

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::ERROR_RESPONSE_KEY, [
                ResponseBuilder::CODE_RESPONSE_KEY => $th->getCode(),
                ResponseBuilder::MSG_RESPONSE_KEY => $th->getMessage(),
            ]);

        } finally {

            $response->getBody()->write($jsonResponse);

            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);

        }

    }

}
