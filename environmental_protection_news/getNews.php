<?php 

    header('Content-Type: application/json');

    function response($type, $data, $msg = NULL) {

        $response = [

            "status" => $type,
            "data" => json_decode($data),
            "msg" => $msg
    
        ];

        return json_encode($response);
    
    }

    $newsJsonPath = __DIR__ . "/news.json";

    $content = @file_get_contents($newsJsonPath);

    if($content !== FALSE) {

        echo response("success", $content);

    } else {

        echo response("fail", null, "Datei konnte nicht gelesen werden!");

    }

?>

