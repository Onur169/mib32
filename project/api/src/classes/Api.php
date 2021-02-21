<?php

namespace App\Classes;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Api
{

    const PREV = "prev";
    const NEXT = "next";

    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    private function getCurrentPage(): int {

        $queryParams = $this->request->getQueryParams();

        return (int) $queryParams["page"] ?? 0;

    }

    public function getNextPage() {

        return $this->getCurrentPage() + 1;

    }

    public function getPrevPage() {

        return $this->getCurrentPage() - 1;

    }

    private function buildPaginatorUrl(string $type) {

        $uri = $this->request->getUri();

        $pageNumber = $type === self::NEXT ? $this->getNextPage() : $this->getPrevPage();

        return $uri->getScheme() . "//" . $uri->getHost() . $uri->getPath() . '?page=' . $pageNumber;

    }

    public function getNextPageUrl() {
        return $this->buildPaginatorUrl(self::NEXT);
    }

    public function getPrevPageUrl() {
        return $this->buildPaginatorUrl(self::PREV);
    }

}
