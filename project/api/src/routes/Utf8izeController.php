<?php

namespace App\Routes;

use App\Classes\Helper;
use App\Classes\Database;
use App\Classes\Api;
use App\Classes\Response as ResponseBuilder;
use App\Exception\ToolException;
use DateTime;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class Utf8izeController
{

    private $db;
    private $filter;
    private $helper;
    private $container;
    private $config;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
        $this->helper = new Helper();
        $this->db = $this->container->get('Database');
        $this->filter = $this->container->get('Filter');
        $this->config = $this->container->get('Config');
    }

    public function get(Request $request, Response $response, array $args): Response
    {

        $report = [];
        $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, $report);

        try {

            $mainConfig = $this->config;

            if (!$this->db->getHandle()->set_charset($mainConfig["db"]["charset"]["set"])) {

                throw new ToolException(ToolException::COULD_NOT_RUN_TOOL);

            }
    
            if ($this->db->getHandle()->connect_error) {
    
                throw new ToolException(ToolException::COULD_NOT_RUN_TOOL);
    
            } else {
    
                $utf8mb4DatabaseRes = mysqli_query($this->db->getHandle(), "ALTER DATABASE " . $mainConfig["db"]["database"] . " CHARACTER SET " . $mainConfig["db"]["charset"]["set"]);
                if ($utf8mb4DatabaseRes) {
                    $report[] = "DB: " . $mainConfig["db"]["database"] . " erfolgreich auf " . $mainConfig["db"]["charset"]["set"] . " gesetzt";
                } else {
                    $report[] = "DB: " . $mainConfig["db"]["database"] . " nicht auf " . $mainConfig["db"]["charset"]["set"] . " gesetzt";
                }
    
                $currentTable = null;
                $showTableRes = mysqli_query($this->db->getHandle(), "SHOW TABLES");
                while ($showTableRow = mysqli_fetch_array($showTableRes)) {
    
                    $currentTable = $showTableRow[0];
                    $utf8mb4TableRes = mysqli_query($this->db->getHandle(), "ALTER TABLE " . $currentTable . " DEFAULT CHARACTER SET " . $mainConfig["db"]["charset"]["set"] . " COLLATE " . $mainConfig["db"]["charset"]["collation"]);

                    if ($utf8mb4TableRes) {
                        $report[] = "Tabelle: " . $currentTable . " erfolgreich auf " . $mainConfig["db"]["charset"]["set"] . " gesetzt";
                    } else {
                        $report[] = "Tabelle: " . $currentTable . " nicht auf " . $mainConfig["db"]["charset"]["set"] . " gesetzt";
                    }
    
                    $showColumnsRes = mysqli_query($this->db->getHandle(), "SHOW COLUMNS FROM " . $currentTable);
                    while ($showColumnsRow = mysqli_fetch_array($showColumnsRes)) {
    
                        $currentColumn = $showColumnsRow[0];
                        $utf8mb4ColumnRes = mysqli_query($this->db->getHandle(), "ALTER TABLE " . $currentTable . " MODIFY " . $currentColumn . " " . $showColumnsRow[1] . " CHARACTER SET " . $mainConfig["db"]["charset"]["set"]);
    
                        if ($utf8mb4ColumnRes) {
                            $report[] = "Spalte: " . $currentColumn . " erfolgreich auf " . $mainConfig["db"]["charset"]["set"] . " gesetzt";
                        } else {
                            $report[] = "Spalte: " . $currentColumn . " nicht auf " . $mainConfig["db"]["charset"]["set"] . " gesetzt";
                        }
    
                    }
    
                }
    
            }

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, $report);

        } catch (\Throwable $th) {

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::ERROR_RESPONSE_KEY, [
                ResponseBuilder::CODE_RESPONSE_KEY => $th->getCode(),
                ResponseBuilder::MSG_RESPONSE_KEY => $th->getMessage()
            ]);

        } finally {

            $response->getBody()->write($jsonResponse);

            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);

        }

    }

}
