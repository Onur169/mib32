<?php

namespace App\Classes;

use Psr\Http\Message\UploadedFileInterface;
use App\Classes\ImageManipulator;
use App\Classes\Database;

use DateTime;

class Upload
{

    const RECURSIVE_TOKEN_PATH_LENGTH = 5;
    const FORM_DATA_UPLOAD_KEY = "image";

    const INSERT_ID = "insert_id";
    const MEDIA_INSERT_ID = "media_insert_id";

    private $imageManipulator;
    private $db;

    public function __construct(Database $db)
    {
        $this->imageManipulator = new ImageManipulator();
        $this->db = $db;
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

        //$basename = bin2hex(random_bytes(8));
        $basename = "original";
        $filename = sprintf('%s.%0.8s', $basename, $extension);

        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
    }

    public function processUpload($uploadedFiles, $mediaToken, $guidv4, $guidv4Medias, $onMediaRowInserted) {

        $now = new DateTime();
        $createdAt = $now->format('Y-m-d H:i:s');

        if ($this->prepareUploadDirectoryByToken($mediaToken)) {

            $uploadedFile = $uploadedFiles[self::FORM_DATA_UPLOAD_KEY];

            if ($uploadedFile->getError() === UPLOAD_ERR_OK) {

                $uploadDirPath = $this->getRecursiveDirectoryAbsolutePathByToken($mediaToken);
                $filename = $this->moveUploadedFile($uploadDirPath, $uploadedFile);
                $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
                $uploadFilePath = $uploadDirPath . "/" . $filename;

                $this->imageManipulator->iterateAllBreakpoints(function ($currentBreakpoint) use ($uploadFilePath) {

                    $this->imageManipulator->createImage(ImageManipulator::COVER_IMAGE, $uploadFilePath, $uploadFilePath, $currentBreakpoint);

                });

                $mediaInsertId = $this->db->insert("medias",
                    ["id", "token", "extension", "created_at"],
                    [$guidv4Medias, $mediaToken, $extension, $createdAt]
                );

                $insertId = $onMediaRowInserted($guidv4, $mediaInsertId, $createdAt);

                return [
                    self::INSERT_ID => $insertId,
                    self::MEDIA_INSERT_ID => $mediaInsertId
                ];

            } else {

                throw new UploadException(UploadException::UPLOAD_WAS_NOT_SUCCESSFUL);

            }

        } else {

            throw new UploadException(UploadException::UPLOAD_DIR_COULD_NOT_BE_PREPARED);

        }

    }

}
