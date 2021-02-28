<?php

namespace App\Exception;

use Exception;

class DatabaseException extends Exception
{

    const INSERT_WAS_NOT_SUCCESSFUL = 0;
    const SELECT_WAS_NOT_SUCCESSFUL = 1;
    const UPDATE_WAS_NOT_SUCCESSFUL = 2;

    private $errorMessages;

    public function __construct($code = -1, Exception $previous = null)
    {

        parent::__construct($this->getErrorMessage($code), $code, $previous);

        $this->errorMessages = [
            self::INSERT_WAS_NOT_SUCCESSFUL => "Insert was not successful",
            self::SELECT_WAS_NOT_SUCCESSFUL => "Select was not successful",
            self::UPDATE_WAS_NOT_SUCCESSFUL => "Update was not successful",
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
