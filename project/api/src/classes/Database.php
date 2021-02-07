<?php

namespace App\Classes;

use App\Exception\DatabaseException;

class Database
{

    protected $handle;

    public function __construct()
    {
        $this->handle = null;
    }

    public function init($config)
    {

        $hostName = $config["hostName"];
        $database = $config["database"];
        $userName = $config["userName"];
        $password = $config["password"];

        $this->handle = new mysqli($hostName, $userName, $password, $database);

    }

    public function insert(string $table, array $columns, array $values)
    {

        $sql = '
            INSERT INTO ' . $table . ' (' . join(",", $columns) . ')
            VALUES (' . join(",", $values) . ')
        ';

        if ($this->handle->query($sql) === true) {
            return $this->handle->insert_id;
        } else {
            throw new DatabaseException(DatabaseException::INSERT_WAS_NOT_SUCCESSFUL);
        }

    }

}
