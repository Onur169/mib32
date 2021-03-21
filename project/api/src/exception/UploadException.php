<?php

namespace App\Exception;

use Exception;

class UploadException extends Exception
{

    const UPLOAD_DIR_COULD_NOT_BE_PREPARED = 0;
    const UPLOAD_WAS_NOT_SUCCESSFUL = 1;

    private $errorMessages;

    public function __construct($code = -1, Exception $previous = null)
    {

        $this->errorMessages = [
            self::UPLOAD_DIR_COULD_NOT_BE_PREPARED => "Upload directory could not be prepared",
            self::UPLOAD_WAS_NOT_SUCCESSFUL => "Upload was not successful",
        ];

        parent::__construct($this->getErrorMessage($code), $code, $previous);

    }

    public function __toString()
    {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }

    public function getErrorMessage($code)
    {
        return $this->errorMessages[$code];
    }
}
