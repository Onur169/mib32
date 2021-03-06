<?php

namespace App\Classes;

use Psr\Http\Message\UploadedFileInterface;

class Upload
{

    const RECURSIVE_TOKEN_PATH_LENGTH = 5;

    private $filters;

    public function __construct()
    {
        $this->filters = [];
    }

    public function getRecursiveDirectoryAbsolutePathByToken($mediaToken)
    {

        $uploadsPath = __DIR__ . '/../../uploads/';
        $recursiveDirectoryPathByToken = join("/", str_split(substr($mediaToken, 0, self::RECURSIVE_TOKEN_PATH_LENGTH)));
        $recursiveDirectoryAbsolutePathByToken = $uploadsPath . "/" . $recursiveDirectoryPathByToken;

        return $recursiveDirectoryAbsolutePathByToken;

    }

    public function prepareUploadDirectoryByToken($mediaToken)
    {

        $recursiveDirectoryAbsolutePathByToken = $this->getRecursiveDirectoryAbsolutePathByToken($mediaToken);

        return @mkdir($recursiveDirectoryAbsolutePathByToken, 0755, true);

    }

    public function moveUploadedFile(string $directory, UploadedFileInterface $uploadedFile)
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

        // see http://php.net/manual/en/function.random-bytes.php
        $basename = bin2hex(random_bytes(8));
        $filename = sprintf('%s.%0.8s', $basename, $extension);

        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
    }

}
