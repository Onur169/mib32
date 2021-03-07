<?php

namespace App\Classes;

class Response
{

    const ACK_RESPONSE_KEY = 'ack';
    const DATA_RESPONSE_KEY = 'data';
    const SUCCESS_RESPONSE_VAL = "success";
    const ERROR_RESPONSE_KEY = "error";
    const CODE_RESPONSE_KEY = "code";
    const MSG_RESPONSE_KEY = "msg";
    const INSERT_ID_RESPONSE_KEY = "insert_id";
    const MEDIA_INSERT_ID_RESPONSE_KEY = "media_insert_id";
    const UPDATE_ID_RESPONSE_KEY = "update_id";
    const PREV_PAGE_URL_KEY = "prev_page_url";
    const NEXT_PAGE_URL_KEY = "next_page_url";
    const CURRENT_PAGE_KEY = "current_page";
    const MAX_PAGES_KEY = "max_pages";

    public static function build($ack, $result, $prevPageUrl = null, $nextPageUrl = null, $magPages = null) {

        $response = [
            self::ACK_RESPONSE_KEY => $ack,
            self::DATA_RESPONSE_KEY => $result
        ];

        if($_SERVER['REQUEST_METHOD'] === 'GET') {

            $response[self::PREV_PAGE_URL_KEY] = $prevPageUrl;
            $response[self::NEXT_PAGE_URL_KEY] = $nextPageUrl;
            $response[self::CURRENT_PAGE_KEY] = (int) $_GET["page"] ?? 1;
            $response[self::MAX_PAGES_KEY] = $magPages ?? null;

        }

        return json_encode($response);

    }

}
