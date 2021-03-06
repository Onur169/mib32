<?php

namespace App\Classes;

class Upload
{

    const RECURSIVE_TOKEN_PATH_LENGTH = 5;

    private $filters;

    public function __construct()
    {
        $this->filters = [];
    }

    public function getRecursiveDirectoryAbsolutePathByToken($mediaToken) {

        $uploadsPath = __DIR__ . '/../../uploads/';
        $recursiveDirectoryPathByToken = join("/", str_split(substr($mediaToken, 0, self::RECURSIVE_TOKEN_PATH_LENGTH)));
        $recursiveDirectoryAbsolutePathByToken = $uploadsPath . "/" . $recursiveDirectoryPathByToken;

        return $recursiveDirectoryAbsolutePathByToken;

    }


    public function prepareUploadDirectoryByToken($mediaToken) {

        $recursiveDirectoryAbsolutePathByToken = $this->getRecursiveDirectoryAbsolutePathByToken($mediaToken);

        return @mkdir($recursiveDirectoryAbsolutePathByToken, 0755, true);

    }

}
