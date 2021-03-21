<?php

namespace App\Exception;

use Exception;

class ToolException extends Exception
{

    const COULD_NOT_RUN_TOOL = 0;

    private $errorMessages;

    public function __construct($code = -1, Exception $previous = null)
    {

        $this->errorMessages = [
            self::COULD_NOT_RUN_TOOL => "Could not run tool",
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
