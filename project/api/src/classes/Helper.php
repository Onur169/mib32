<?php

namespace App\Classes;

use App\Exception\HtaccessException;
use App\Exception\Messages;

class Helper
{

    private $helper;

    public function __construct()
    {
    }

    public function isLocalhost($whitelist = ['127.0.0.1', '::1'])
    {
        return in_array($_SERVER['REMOTE_ADDR'], $whitelist);
    }

    public function guidv4($data = null)
    {
        // Generate 16 bytes (128 bits) of random data or use the data passed into the function.
        $data = $data ?? random_bytes(16);
        assert(strlen($data) == 16);

        // Set version to 0100
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        // Set bits 6-7 to 10
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

        // Output the 36 character UUID.
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
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
