<?php

namespace App\Exception;

use Exception;

class ApiException extends Exception
{

    const AUTH_TOKEN_IS_NOT_SET = 0;
    const AUTH_TOKEN_IS_NOT_VALID = 1;

    private $errorMessages;

    public function __construct($code = -1, Exception $previous = null)
    {

        $this->errorMessages = [
            self::AUTH_TOKEN_IS_NOT_SET => "Auth token is not set",
            self::AUTH_TOKEN_IS_NOT_VALID => "Auth token is not valid",
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
