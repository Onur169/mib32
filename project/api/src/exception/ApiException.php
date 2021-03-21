<?php

namespace App\Exception;

use Exception;

class ApiException extends Exception
{

    const AUTH_TOKEN_IS_NOT_SET = 0;
    const AUTH_TOKEN_IS_NOT_VALID = 1;

    private $errorMessages;

    /**
     * Set error messages for api exceptions and call parent construct
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  int $code
     * @param  Exception $previous
     * @return void
     */
    public function __construct(int $code = -1, Exception $previous = null)
    {

        $this->errorMessages = [
            self::AUTH_TOKEN_IS_NOT_SET => "Auth token is not set",
            self::AUTH_TOKEN_IS_NOT_VALID => "Auth token is not valid",
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
