<?php

namespace App\Routes;

use App\Classes\Filter;
use App\Classes\Helper;
use App\Classes\Response as ResponseBuilder;
use App\Classes\Upload;
use App\Exception\UploadException;
use DateTime;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use moveUploadedFile;

class TestimonialController
{

    private $db;
    private $filter;
    private $helper;
    private $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
        $this->helper = new Helper();
        $this->db = $this->container->get('Database');
        $this->filter = $this->container->get('Filter');
        $this->upload = new Upload();
    }

    public function add(Request $request, Response $response, array $args): Response
    {

        try {

            $params = $request->getQueryParams();
            $now = new DateTime();

            $guidv4 = $this->helper->guidv4();
            $guidv4Medias = $this->helper->guidv4();
            $headline = $params["headline"];
            $description = $params["description"];
            $createdAt = $now->format('Y-m-d H:i:s');

            $uploadedFiles = $request->getUploadedFiles();
            $mediaToken = sha1($guidv4);
            $insertId = null;
            $mediaInsertId = null;

            if (count($uploadedFiles) > 0) {

                // Bei Upload auch Eintrag in die medias-Tabelle [TODO]
                if ($this->upload->prepareUploadDirectoryByToken($mediaToken)) {

                    // Hier Datei hochladen / verarbeiten in die versch. Größen / Eintrag in medias-Tabelle
                    $uploadedFile = $uploadedFiles['image'];

                    if ($uploadedFile->getError() === UPLOAD_ERR_OK) {

                        $filename = $this->upload->moveUploadedFile($this->upload->getRecursiveDirectoryAbsolutePathByToken($mediaToken), $uploadedFile);
                        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

                        $mediaInsertId = $this->db->insert("medias",
                            ["id", "token", "extension", "created_at"],
                            [$guidv4Medias, $mediaToken, $extension, $createdAt]
                        );

                        $insertId = $this->db->insert("testimonials",
                            ["id", "headline", "description", "created_at", "medias_id"],
                            [$guidv4, $headline, $description, $createdAt, $mediaInsertId]
                        );

                    } else {

                        throw new UploadException(UploadException::UPLOAD_WAS_NOT_SUCCESSFUL);

                    }

                } else {

                    throw new UploadException(UploadException::UPLOAD_DIR_COULD_NOT_BE_PREPARED);

                }

            } else {

                $insertId = $this->db->insert("testimonials",
                    ["id", "headline", "description", "created_at", "medias_id"],
                    [$guidv4, $headline, $description, $createdAt, $guidv4Medias]
                 );

            }

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::SUCCESS_RESPONSE_VAL, [
                ResponseBuilder::INSERT_ID_RESPONSE_KEY => $insertId,
                ResponseBuilder::MEDIA_INSERT_ID_RESPONSE_KEY => $mediaInsertId,
            ]);

        } catch (\Throwable $th) {

            $jsonResponse = ResponseBuilder::build(ResponseBuilder::ERROR_RESPONSE_KEY, [
                ResponseBuilder::CODE_RESPONSE_KEY => $th->getCode(),
                ResponseBuilder::MSG_RESPONSE_KEY => $th->getMessage(),
            ]);

        } finally {

            $response->getBody()->write($jsonResponse);

            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);

        }

    }

}
