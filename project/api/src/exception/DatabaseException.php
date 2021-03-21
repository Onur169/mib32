<?php

namespace App\Exception;

use Exception;

class DatabaseException extends Exception
{

    const INSERT_WAS_NOT_SUCCESSFUL = 0;
    const SELECT_WAS_NOT_SUCCESSFUL = 1;
    const UPDATE_WAS_NOT_SUCCESSFUL = 2;

    private $errorMessages;

    /**
     * Set error messages for database exceptions and call parent construct
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  int $code
     * @param  Exception $previous
     * @return void
     */
    public function __construct($code = -1, Exception $previous = null)
    {

        $this->errorMessages = [
            self::INSERT_WAS_NOT_SUCCESSFUL => "Insert was not successful",
            self::SELECT_WAS_NOT_SUCCESSFUL => "Select was not successful",
            self::UPDATE_WAS_NOT_SUCCESSFUL => "Update was not successful",
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
