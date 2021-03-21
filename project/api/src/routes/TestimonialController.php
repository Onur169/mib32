<?php

namespace App\Routes;

use App\Classes\Api;
use App\Classes\Database;
use App\Classes\Filter;
use App\Classes\Helper;
use App\Classes\ImageManipulator;
use App\Classes\Response as ResponseBuilder;
use App\Classes\Upload;
use DateTime;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class TestimonialController
{

    private $db;
    private $filter;
    private $helper;
    private $container;
    private $imageManipulator;

    /**
     * __construct
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param ContainerInterface $container
     * @return void
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
        $this->helper = new Helper();
        $this->db = $this->container->get('Database');
        $this->filter = $this->container->get('Filter');
        $this->upload = new Upload($this->db, ImageManipulator::TESTIMONIALS_IMAGE);
        $this->imageManipulator = new ImageManipulator();
    }

    /**
     * Get testimonials
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  Request $request
     * @param  Response $response
     * @param  array $args
     * @return Response
     */
    public function get(Request $request, Response $response, array $args): Response
    {

        try {

            $params = $request->getQueryParams();

            $usedFilter = $params["filter"] ?? null;
            $filterSql = $this->filter->build("testimonials", $usedFilter);

            $api = new Api($this->db, $request);
            $prevPageUrl = $api->getPrevPageUrl();
            $nextPageUrl = $api->getNextPageUrl();

            $sqlWithoutLimit = $api->db()->buildSql(
                'SELECT testimonials.id, testimonials.headline, testimonials.description, medias.token, medias.extension',
                'FROM testimonials',
                'LEFT JOIN medias ON medias.id = testimonials.medias_id',
                $filterSql,
                'group by id',
                null,
                'ORDER BY testimonials.created_at ASC',
                null
            );

            $maxPages = $api->getMaxPages($sqlWithoutLimit);

            $result = $api->getWithPaginator($sqlWithoutLimit);
            $list = $result[Database::DATA];

            foreach ($list as $listItem) {

                $mediaToken = $listItem->token;
                $filePath = $this->upload->getRecursiveDirectoryAbsolutePathByToken($mediaToken) . "/original." . $listItem->extension;
                $images = $this->imageManipulator->getImagesByToken(ImageManipulator::TESTIMONIALS_IMAGE, $filePath, $mediaToken);

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

    /**
     * Add testimonials
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  Request $request
     * @param  Response $response
     * @param  array $args
     * @return Response
     */
    public function add(Request $request, Response $response, array $args): Response
    {

        try {

            $params = $request->getQueryParams();
            $now = new DateTime();

            $guidv4 = $this->helper->guidv4();
            $guidv4Medias = $this->helper->guidv4();
            $headline = $params["headline"];
            $description = $params["description"];
            $createdAt = $now->format('Y-m-d H:i:s');

            $uploadedFiles = $request->getUploadedFiles();
            $mediaToken = sha1($guidv4);
            $insertId = null;
            $mediaInsertId = null;

            if (count($uploadedFiles) > 0) {

                $insertAndMediaId = $this->upload->processUpload($uploadedFiles, $mediaToken, $guidv4, $guidv4Medias, function ($guidv4, $mediaInsertId, $createdAt) use ($headline, $description) {

                    return $this->db->insert("testimonials",
                        ["id", "headline", "description", "created_at", "medias_id"],
                        [$guidv4, $headline, $description, $createdAt, $mediaInsertId]
                    );

                });

                $insertId = $insertAndMediaId[Upload::INSERT_ID];
                $mediaInsertId = $insertAndMediaId[Upload::MEDIA_INSERT_ID];

            } else {

                $insertId = $this->db->insert("testimonials",
                    ["id", "headline", "description", "created_at", "medias_id"],
                    [$guidv4, $headline, $description, $createdAt, $guidv4Medias]
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
