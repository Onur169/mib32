<?php

namespace App\Classes;

use Exception;
use SQLite3;

class Database
{

    protected $handle;

    public function __construct()
    {
        $this->handle = null;
    }

    public function init($location)
    {



        $this->handle = new mysqli($hostName, $userName, $password, $database);

    }

    public function query($sql)
    {



    }

    public function execute($sql)
    {

    }

}