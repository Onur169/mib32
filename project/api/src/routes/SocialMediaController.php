<?php

namespace App\Routes;

use App\Classes\Helper;
use App\Classes\Database;
use App\Classes\Filter;
use App\Classes\Api;
use App\Classes\Response as ResponseBuilder;
use DateTime;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class SocialMediaController
{

    private $db;
    private $filter;
    private $helper;
    private $container;

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
    }

    /**
     * Get social media types
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
            $filterSql = $this->filter->build("social_media_types", $usedFilter);

            $api = new Api($this->db, $request);
            $prevPageUrl = $api->getPrevPageUrl();
            $nextPageUrl = $api->getNextPageUrl();

            $sqlWithoutLimit = $api->db()->buildSql(
                'SELECT *',
                'FROM social_media_types',
                Database::NO_JOIN_PART,
                $filterSql,
                Database::NO_GROUP_BY_PART,
                Database::NO_HAVING_PART,
                'ORDER BY name ASC',
                Database::NO_LIMIT_PART
            );

            $maxPages = $api->getMaxPages($sqlWithoutLimit);

            $result = $api->getWithPaginator($sqlWithoutLimit);
            $list = $result[Database::DATA];

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, $list, $prevPageUrl, $nextPageUrl, $maxPages);

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

    /**
     * Add social media types
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
            $name = $params["name"];
            $createdAt = $now->format('Y-m-d H:i:s');

            $insertId = $this->db->insert("social_media_types",
                ["id", "name", "created_at"],
                [$guidv4, $name, $createdAt]
            );

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, [
                ResponseBuilder::INSERT_ID_RESPONSE_KEY => $insertId,
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

    /**
     * Get social media hashtag stats by social media type
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  Request $request
     * @param  Response $response
     * @param  array $args
     * @return Response
     */
    public function getStat(Request $request, Response $response, array $args): Response
    {

        try {

            $params = $request->getQueryParams();

            $usedFilter = $params["filter"] ?? null;
            $filterSql = $this->filter->build("social_media_hashtag_stats", $usedFilter);

            $api = new Api($this->db, $request);
            $prevPageUrl = $api->getPrevPageUrl();
            $nextPageUrl = $api->getNextPageUrl();

            $sqlWithoutLimit = $api->db()->buildSql(
                'SELECT social_media_hashtag_stats.id, social_media_hashtag_stats.hashtag, social_media_hashtag_stats.counter, social_media_types.name',
                'FROM social_media_hashtag_stats',
                'INNER JOIN social_media_types ON social_media_types.id = social_media_hashtag_stats.social_media_types_id',
                $filterSql,
                'group by id',
                Database::NO_HAVING_PART,
                'ORDER BY social_media_types.name ASC',
                Database::NO_LIMIT_PART
            );
        
            $maxPages = $api->getMaxPages($sqlWithoutLimit);

            $result = $api->getWithPaginator($sqlWithoutLimit);
            $list = $result[Database::DATA];

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, $list, $prevPageUrl, $nextPageUrl, $maxPages);

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

    /**
     * Add social media hashtag stats by social media type
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  Request $request
     * @param  Response $response
     * @param  array $args
     * @return Response
     */
    public function addStat(Request $request, Response $response, array $args): Response
    {

        try {

            $params = $request->getQueryParams();
            $now = new DateTime();

            $guidv4 = $this->helper->guidv4();
            $socialMediaTypesId = $args['id'];
            $hashtag = preg_replace('/\s+/', '', $params["hashtag"]);
            $createdAt = $now->format('Y-m-d H:i:s');

            $insertId = $this->db->insert("social_media_hashtag_stats",
                ["id", "hashtag", "counter", "social_media_types_id", "created_at"],
                [$guidv4, $hashtag, 0, $socialMediaTypesId, $createdAt]
            );

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, [
                ResponseBuilder::INSERT_ID_RESPONSE_KEY => $insertId,
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

    /**
     * Edit social media hashtag stats by social media type
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  Request $request
     * @param  Response $response
     * @param  array $args
     * @return Response
     */
    public function editStat(Request $request, Response $response, array $args): Response
    {

        try {

            $params = $request->getQueryParams();

            $id = $args['id'];
            $counter = (int) $params["counter"];

            $updateArray = [
                "counter" => $counter
            ];

            $updateId = $this->db->update("social_media_hashtag_stats", $id, $updateArray);

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, [
                ResponseBuilder::UPDATE_ID_RESPONSE_KEY => $updateId,
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
