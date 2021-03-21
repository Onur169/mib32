<?php

namespace App\Routes;

use App\Classes\Api;
use App\Classes\Database;
use App\Classes\Filter;
use App\Classes\Helper;
use App\Classes\Response as ResponseBuilder;
use DateTime;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class EventController
{

    const DEFAULT_RADIUS_METERS = 10000;

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
     * Get events
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
            $lat = $params["lat"] ?? null;
            $lng = $params["lng"] ?? null;
            $radiusKm = $params["radius_km"] ?? null;
            $radiusMeters = isset($radiusKm) ? (float) $radiusKm * 1000 : self::DEFAULT_RADIUS_METERS;

            $usedFilter = $params["filter"] ?? null;
            $filterSql = $this->filter->build("events", $usedFilter);

            $distanceField = isset($lat) && isset($lng) && isset($radiusKm) ? ', ST_Distance_Sphere( point(lng, lat), point(' . $lng . ', ' . $lat . ') ) as distance_meters' : '';
            $havingWhere = $distanceField == '' ? '' : 'having distance_meters <= ' . $radiusMeters;

            $api = new Api($this->db, $request);
            $prevPageUrl = $api->getPrevPageUrl();
            $nextPageUrl = $api->getNextPageUrl();

            $sqlWithoutLimit = $api->db()->buildSql(
                'SELECT id, name, description, start_at, end_at, lat, lng, location_name' . $distanceField,
                'FROM events',
                null,
                $filterSql,
                'group by id',
                $havingWhere,
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
     * Add events
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
            $description = $params["description"];
            $startAt = $params["start_at"];
            $endAt = $params["end_at"];
            $lat = $params["lat"];
            $lng = $params["lng"];
            $locationName = $params["location_name"];
            $createdAt = $now->format('Y-m-d H:i:s');

            $insertId = $this->db->insert("events",
                ["id", "name", "description", "start_at", "end_at", "lat", "lng", "location_name", "created_at"],
                [$guidv4, $name, $description, $startAt, $endAt, $lat, $lng, $locationName, $createdAt]
            );

            $guidv4Throwback = $this->helper->guidv4();
            $insertThrowbackId = $this->db->insert("throwbacks",
                ["id", "description", "social_media_video_url", "events_id", "created_at"],
                [$guidv4Throwback, $description, "", $guidv4, $createdAt]
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
     * Edit specific event
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
            $name = $params["name"];
            $description = $params["description"];
            $startAt = $params["start_at"];
            $endAt = $params["end_at"];
            $lat = $params["lat"];
            $lng = $params["lng"];

            $updateArray = [
                "name" => $name,
                "description" => $description,
                "start_at" => $startAt,
                "end_at" => $endAt,
                "lat" => $lat,
                "lng" => $lng,
            ];

            $updateId = $this->db->update("events", $id, $updateArray);

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
