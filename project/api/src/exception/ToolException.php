<?php

namespace App\Exception;

use Exception;

class ToolException extends Exception
{

    const COULD_NOT_RUN_TOOL = 0;

    private $errorMessages;

    /**
     * Set error messages for tool exceptions and call parent construct
     * @author Onur Sahin <onursahin169@gmail.com>
     * @param  int $code
     * @param  Exception $previous
     * @return void
     */
    public function __construct($code = -1, Exception $previous = null)
    {

        $this->errorMessages = [
            self::COULD_NOT_RUN_TOOL => "Could not run tool",
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
