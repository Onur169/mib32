<?php

namespace App\Classes;

use App\Exception\HtaccessException;
use App\Exception\Messages;

class Helper
{

    public function __construct()
    {

    }

    public function isLocalhost($whitelist = ['127.0.0.1', '::1']) {
        return in_array($_SERVER['REMOTE_ADDR'], $whitelist);
    }

    public function htaccess($location, $key)
    {
        $htaccessContentArr = file($location . ".htaccess");

        $foundArr = array_filter($htaccessContentArr, function ($item) use ($key) {
            return strpos($item, $key) !== false;
        });

        $correctedNumericIndexFoundArr = array_values($foundArr);

        if (count($correctedNumericIndexFoundArr) > 0) {
            return $correctedNumericIndexFoundArr;
        } else {
            throw new HtaccessException(Messages::HTACCESS_KEY_NOT_FOUND);
        }

    }

}
