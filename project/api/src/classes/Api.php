<?php

namespace App\Classes;

use App\Classes\Database;
use Psr\Http\Message\ServerRequestInterface as Request;

class Api
{

    const PREV = "prev";
    const NEXT = "next";

    private $request;
    private $db;

    public function __construct(Database $db, Request $request)
    {
        $this->request = $request;
        $this->db = $db;
    }

    public function db() {
        return $this->db;
    }

    private function getCurrentPage(): int
    {

        $queryParams = $this->request->getQueryParams();

        return (int) $queryParams["page"] ?? 1;

    }

    public function getNextPage()
    {

        return $this->getCurrentPage() + 1;

    }

    public function getPrevPage()
    {

        $pageNumber = $this->getCurrentPage() - 1;

        return $pageNumber > 0 ? $pageNumber : 1;

    }

    private function buildPaginatorUrl(string $type)
    {

        $uri = $this->request->getUri();

        $pageNumber = $type === self::NEXT ? $this->getNextPage() : $this->getPrevPage();

        return $uri->getScheme() . "://" . $uri->getHost() . $uri->getPath() . '?page=' . $pageNumber;

    }

    public function getNextPageUrl()
    {
        return $this->buildPaginatorUrl(self::NEXT);
    }

    public function getPrevPageUrl()
    {
        return $this->buildPaginatorUrl(self::PREV);
    }

    public function buildPaginatorSql()
    {
        return $this->db->buildPaginatorSql($this->request);
    }

    public function getWithPaginator($sql)
    {

        $paginatorSql = $this->buildPaginatorSql();

        $sql = $sql . ' ' . $paginatorSql;

        return $this->db->get($sql);

    }

    public function getMaxPages($sqlWithoutLimit) {


        $result = $this->db->get($sqlWithoutLimit);
        $numRows = $result[Database::NUM_ROWS];

        $maxPages = ceil($numRows / $this->db->getItemsToShowPerPage());

        return $maxPages;

    }

}
