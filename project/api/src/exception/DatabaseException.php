<?php

namespace App\Exception;

use Exception;

const INSERT_WAS_NOT_SUCCESSFUL = 0;

class DatabaseException extends Exception
{

    private $errorMessages;

    public function __construct($code = -1, Exception $previous = null)
    {

        parent::__construct(self::getErrorMessage($code), $code, $previous);

        $this->$errorMessages = [
            self::INSERT_WAS_NOT_SUCCESSFUL => "Insert was not successful",
        ];

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
