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

    /**
     * Get Database instance
     * @author Onur Sahin <onursahin169@gmail.com>
     * @return Database
     */
    public function db(): Database
    {
        return $this->db;
    }

    /**
     * Get current page number through get parameter "page" and cast it into an integer
     * @author Onur Sahin <onursahin169@gmail.com>
     * @return int
     */
    private function getCurrentPage(): int
    {

        $queryParams = $this->request->getQueryParams();
        $currentPage = isset($queryParams["page"]) ? (int) $queryParams["page"] : 1;

        return $currentPage;

    }

    /**
     * Get next page number
     * @author Onur Sahin <onursahin169@gmail.com>
     * @return int
     */
    public function getNextPage(): int
    {

        return $this->getCurrentPage() + 1;

    }

    /**
     * Get previous page number
     * @author Onur Sahin <onursahin169@gmail.com>
     * @return int
     */
    public function getPrevPage(): int
    {

        $pageNumber = $this->getCurrentPage() - 1;

        return $pageNumber > 0 ? $pageNumber : 1;

    }

    /**
     * Get prev-/next url for pagination
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param string $type
     * @return string
     */
    private function buildPaginatorUrl(string $type): string
    {

        $uri = $this->request->getUri();

        $pageNumber = $type === self::NEXT ? $this->getNextPage() : $this->getPrevPage();

        return $uri->getScheme() . "://" . $uri->getHost() . $uri->getPath() . '?page=' . $pageNumber;

    }

    /**
     * Get next url for pagination
     * @author Onur Sahin <onursahin169@gmail.com>
     * @return string
     */
    public function getNextPageUrl()
    {
        return $this->buildPaginatorUrl(self::NEXT);
    }

    /**
     * Get prev url for pagination
     * @author Onur Sahin <onursahin169@gmail.com>
     * @return string
     */
    public function getPrevPageUrl()
    {
        return $this->buildPaginatorUrl(self::PREV);
    }
    
    /**
     * Builds the Limit/Offset-String in sql statement for pagination
     * @author Onur Sahin <onursahin169@gmail.com>
     * @return string
     */
    public function buildPaginatorSql(): string
    {
        return $this->db->buildPaginatorSql($this->request);
    }

    public function getWithPaginator($sql)
    {

        $paginatorSql = $this->buildPaginatorSql();

        $sql = $sql . ' ' . $paginatorSql;

        return $this->db->get($sql);

    }

    /**
     * Get max page number for pagination
     *
     * @param  string  $sqlWithoutLimit
     * @author Onur Sahin <onursahin169@gmail.com>
     * @return int
     */
    public function getMaxPages(string $sqlWithoutLimit): int
    {

        $result = $this->db->get($sqlWithoutLimit);
        $numRows = $result[Database::NUM_ROWS];

        $maxPages = ceil($numRows / $this->db->getItemsToShowPerPage());

        return $maxPages;

    }

}
