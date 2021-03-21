<?php

namespace App\Exception;

use Exception;

class UploadException extends Exception
{

    const UPLOAD_DIR_COULD_NOT_BE_PREPARED = 0;
    const UPLOAD_WAS_NOT_SUCCESSFUL = 1;

    private $errorMessages;

    /**
     * Set error messages for upload exceptions and call parent construct
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  int $code
     * @param  Exception $previous
     * @return void
     */
    public function __construct($code = -1, Exception $previous = null)
    {

        $this->errorMessages = [
            self::UPLOAD_DIR_COULD_NOT_BE_PREPARED => "Upload directory could not be prepared",
            self::UPLOAD_WAS_NOT_SUCCESSFUL => "Upload was not successful",
        ];

        parent::__construct($this->getErrorMessage($code), $code, $previous);

    }

    /**
     * __toString
     * @author Onur Sahin <onursahin169@gmail.com>
     * @return string
     */
    public function __toString(): string
    {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }

    /**
     * Get Error message by code
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  int $code
     * @return string
     */
    public function getErrorMessage(int $code): string
    {
        return $this->errorMessages[$code];
    }

}
