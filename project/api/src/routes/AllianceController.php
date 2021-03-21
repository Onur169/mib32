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
        $this->upload = new Upload($this->db, ImageManipulator::ALLIANCES_IMAGE);
        $this->imageManipulator = new ImageManipulator();
    }

    public function get(Request $request, Response $response, array $args): Response
    {

        try {

            $params = $request->getQueryParams();

            $usedFilter = $params["filter"] ?? null;
            $filterSql = $this->filter->build("alliances", $usedFilter);

            $api = new Api($this->db, $request);
            $prevPageUrl = $api->getPrevPageUrl();
            $nextPageUrl = $api->getNextPageUrl();

            $sqlWithoutLimit = $api->db()->buildSql(
                'SELECT alliances.id, alliances.name, alliances.url, medias.token, medias.extension',
                'FROM alliances',
                'LEFT JOIN medias ON medias.id = alliances.medias_id',
                $filterSql,
                'group by id',
                null,
                'ORDER BY alliances.created_at ASC',
                null
            );

            $maxPages = $api->getMaxPages($sqlWithoutLimit);

            $result = $api->getWithPaginator($sqlWithoutLimit);
            $list = $result[Database::DATA];

            foreach($list as $listItem) {

                $mediaToken = $listItem->token;
                $filePath = $this->upload->getRecursiveDirectoryAbsolutePathByToken($mediaToken) . "/original." . $listItem->extension;
                $images = $this->imageManipulator->getImagesByToken(ImageManipulator::ALLIANCES_IMAGE, $filePath, $mediaToken);

                $listItem->images = $images;
            }

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, $list, $prevPageUrl, $nextPageUrl, $maxPages);

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
