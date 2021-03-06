<?php

namespace App\Classes;

class Filter
{

    const NAME = "name";
    const SQL = "sql";
    const REF_TABLE = "events";

    private $filters;

    public function __construct()
    {
        $this->filters = [];
    }

    public function register($name, $sql, $refTable)
    {
        $this->filters[] = [
            self::NAME => $name,
            self::SQL => $sql,
            self::REF_TABLE => $refTable
        ];
    }

    public function isWhiteListVerified() {

    }

    public function build($refTable, $usedFilter) {

        $sql = [];

        foreach($this->filters as $currentFilter) {
    
            $isTableRegistered = in_array($refTable, $currentFilter[self::REF_TABLE]);

            $usedFilterArr = explode(",", $usedFilter);
            $isFilterRegistered = false;

            foreach($usedFilterArr as $currentUsedFilter) {
                $isFilterRegistered = $currentUsedFilter == $currentFilter[self::NAME];
                if($isFilterRegistered) break;
            }

            if($isTableRegistered && $isFilterRegistered) {
                $sql[] = 'AND ' . $currentFilter[self::SQL];
            }

            if(count($sql) == 1) {
                $sql[0] = str_replace('AND', '', $sql[0]);
            }
            
        }    
        
        return join(PHP_EOL, $sql);

    }

}
