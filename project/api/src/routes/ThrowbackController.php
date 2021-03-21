<?php

namespace App\Routes;

use App\Classes\Api;
use App\Classes\Database;
use App\Classes\Helper;
use App\Classes\Response as ResponseBuilder;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ThrowbackController
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
     * Get throwbacks
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
            $filterSql = $this->filter->build("throwbacks", $usedFilter);

            $api = new Api($this->db, $request);
            $prevPageUrl = $api->getPrevPageUrl();
            $nextPageUrl = $api->getNextPageUrl();

            $sqlWithoutLimit = $api->db()->buildSql(
                'SELECT throwbacks.id, events.name, throwbacks.description, throwbacks.social_media_video_url, events.start_at, events.end_at, events.lat, events.lng, events.location_name',
                'FROM events',
                'INNER JOIN throwbacks ON events.id = throwbacks.events_id',
                $filterSql,
                'group by id',
                null,
                'ORDER BY start_at ASC',
                null
            );

            $maxPages = $api->getMaxPages($sqlWithoutLimit);

            $result = $api->getWithPaginator($sqlWithoutLimit);
            $list = $result[Database::DATA];

            foreach ($list as $listItem) {

                $description = $listItem->description;
                $descriptionShortened = $this->helper->shortenText($description);

                $listItem->description_shortened = $descriptionShortened;

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
     * Edit throwbacks
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  Request $request
     * @param  Response $response
     * @param  array $args
     * @return Response
     */
    public function edit(Request $request, Response $response, array $args): Response
    {

        try {

            $params = $request->getQueryParams();

            $id = $args['id'];
            $description = $params["description"];
            $socialMediaVideoUrl = $params["social_media_video_url"];

            $updateArray = [
                "description" => $description,
                "social_media_video_url" => $socialMediaVideoUrl,
            ];

            $updateId = $this->db->update("throwbacks", $id, $updateArray);

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
