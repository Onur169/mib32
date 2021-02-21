<?php

namespace App\Classes;

class Template
{

    private $tabsPath;

    public function __construct()
    {
        $this->tabsPath = __DIR__ . "/../../tabs/";
    }

    public function getTabs()
    {

        $arr = [];
        $glob = glob($this->tabsPath . "*.php");

        foreach($glob as $currentTab) {
            $arr[] = pathinfo($currentTab);
        }

        return $arr;

    }

    public function isTabRegistered($tab) {

        foreach($this->getTabs() as $currentTab) {

            if($currentTab["filename"] == $tab) {
                return true;
            }

        }

        return false;

    }

}
