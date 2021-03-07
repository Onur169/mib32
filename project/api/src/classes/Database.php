<?php

namespace App\Classes;

use App\Exception\DatabaseException;
use mysqli;
use Psr\Http\Message\ServerRequestInterface as Request;

class Database
{

    protected $handle;
    private $itemsToShowPerPage;
    private $isPagingActive;

    const NUM_ROWS = "num_rows";
    const DATA = "data";

    public function __construct($config)
    {

        $hostName = $config["db"]["hostName"];
        $database = $config["db"]["database"];
        $userName = $config["db"]["userName"];
        $password = $config["db"]["password"];

        $this->itemsToShowPerPage = 5;
        $this->isPagingActive = false;
        $this->handle = new mysqli($hostName, $userName, $password, $database);

    }

    public function getHandle() {
        return $this->handle;
    }

    public function setItemsToShowPerPage($maxItems)
    {
        $this->itemsToShowPerPage = $maxItems;
    }

    public function getItemsToShowPerPage()
    {
        return $this->itemsToShowPerPage;
    }

    public function buildPaginatorSql(Request $request): string
    {

        $this->isPagingActive = true;

        $queryParams = $request->getQueryParams();
        $page = $queryParams["page"] ?? 1;
        $offset = ($page - 1) * $this->itemsToShowPerPage;

        return 'LIMIT ' . $this->itemsToShowPerPage . ' OFFSET ' . $offset;

    }

    public function get($sql)
    {

        $list = [];

        $result = $this->handle->query($sql);

        if ($result) {

            while ($row = $result->fetch_object()) {
                $list[] = $row;
            }

            $numRows = $result->num_rows;

            $result->close();
            $this->handle->next_result();

            return [
                self::NUM_ROWS => $numRows,
                self::DATA => $list
            ];

        } else {

            throw new DatabaseException(DatabaseException::SELECT_WAS_NOT_SUCCESSFUL);

        }

    }

    public function insert(string $table, array $columns, array $values)
    {

        $valuesStr = "'" . join("','", $values) . "'";
        $columnsStr = join(",", $columns);

        $sql = '
            INSERT INTO ' . $table . ' (' . $columnsStr . ')
            VALUES (' . htmlentities($valuesStr) . ')
        ';

        $idKey = array_search('id', $columns);
        $idVal = $values[$idKey];

        if ($this->handle->query($sql) === true) {
            return $idVal;
        } else {
            throw new DatabaseException(DatabaseException::INSERT_WAS_NOT_SUCCESSFUL);
        }

    }

    public function update(string $table, string $id, array $updateArray)
    {
        
        $columnWithValues = [];
        
        foreach($updateArray as $updateKey => $updateValue) {
            $columnWithValues[] = $updateKey . " = '" . $updateValue . "'" ;
        }

        $sql = '
            UPDATE '.$table.' 
            SET '.join(",", $columnWithValues).' 
            WHERE id = "'.$id.'"
        ';

        if ($this->handle->query($sql) === true) {
            return $id;
        } else {
            throw new DatabaseException(DatabaseException::UPDATE_WAS_NOT_SUCCESSFUL);
        }

    }

    public function buildSql(?string $selectPart, ?string $fromPart, ?string $joinPart, ?string $wherePart, ?string $groupByPart, ?string $orderByPart, ?string $limitPart) {

        $args = func_get_args();

        return join(" ", $args);

    }

}
