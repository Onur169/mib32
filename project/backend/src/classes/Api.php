<?php

namespace App\Classes;

use GuzzleHttp;
use GuzzleHttp\Client;

class Api
{

    private $client;

    public function __construct()
    {

        $this->client = new Client([
            'base_uri' => 'https://api.judoclub-rockenberg.de',
        ]);

    }

    public function getRessource($ressource, $page = 1)
    {
        return json_decode($this->client->request('GET', '/climatestrike/'.$ressource.'?page=' . $page)->getBody()->getContents(), true);
    }

    public function injectRessourceDataIntoWindowObject($response) {
        echo '<script>window["api"] = []; window.api["data"] = '.json_encode($response).'</script>';
    }

}
