<?php

namespace App\Classes;

use mysqli;
use App\Exception\DatabaseException;

class Database
{

    protected $handle;

    public function __construct($config)
    {

        $hostName = $config["db"]["hostName"];
        $database = $config["db"]["database"];
        $userName = $config["db"]["userName"];
        $password = $config["db"]["password"];

        $this->handle = new mysqli($hostName, $userName, $password, $database);

    }

    public function get($sql) {

        $list = [];

        $result = $this->handle->query($sql);

        if($result){

            while ($row = $result->fetch_object()){
                $list[] = $row;
            }

            $result->close();
            $this->handle->next_result();

            return $list;

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

}
