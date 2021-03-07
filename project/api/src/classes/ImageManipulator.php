<?php

namespace App\Classes;

use Intervention\Image\ImageManager;

class ImageManipulator
{

    const SOURCE = "source";
    const LARGE = "large";
    const SMALL = "small";
    const MEDIUM = "medium";

    const WIDTH = "width";
    const HEIGHT = "height";

    const IMAGES = "images";
    const COVER_IMAGE = "cover_image";

    const LARGE_COVER_IMAGE_WIDTH = 1000;
    const LARGE_COVER_IMAGE_HEIGHT = 500;

    const MEDIUM_COVER_IMAGE_WIDTH = 750;
    const MEDIUM_COVER_IMAGE_HEIGHT = 250;

    const SMALL_COVER_IMAGE_WIDTH = 600;
    const SMALL_COVER_IMAGE_HEIGHT = 100;

    const QUALITY = 40;
    const BEST_QUALITY = 60;

    const JPG = "jpg";
    const JPEG = "jpeg";
    const PNG = "png";

    public function __construct()
    {

    }

    public function getAllAllowedImageExtensions()
    {
        return [
            self::JPG,
            self::JPEG,
            self::PNG,
        ];
    }

    public function getAllBreakpoints()
    {
        return [
            self::SMALL,
            self::MEDIUM,
            self::LARGE,
        ];
    }

    public function iterateAllBreakpoints($currentItem)
    {
        foreach ($this->getAllBreakpoints() as $currentBreakpoint) {
            $currentItem($currentBreakpoint);
        }

    }

    public function getCoverImageBreakpointDimensions()
    {
        return [
            self::LARGE => [
                self::WIDTH => self::LARGE_COVER_IMAGE_WIDTH,
                self::HEIGHT => self::LARGE_COVER_IMAGE_HEIGHT,
            ],
            self::SMALL => [
                self::WIDTH => self::SMALL_COVER_IMAGE_WIDTH,
                self::HEIGHT => self::SMALL_COVER_IMAGE_HEIGHT,
            ],
            self::MEDIUM => [
                self::WIDTH => self::MEDIUM_COVER_IMAGE_WIDTH,
                self::HEIGHT => self::MEDIUM_COVER_IMAGE_HEIGHT,
            ],
        ];
    }

    public function getBreakpointFileName($type, $destinationPath, $breakpoint)
    {

        if ($type == self::COVER_IMAGE) {

            $coverImageBreakpoints = $this->getCoverImageBreakpointDimensions();
            $imageBreakpointSmall = $coverImageBreakpoints[self::SMALL];
            $imageBreakpointMedium = $coverImageBreakpoints[self::MEDIUM];
            $imageBreakpointLarge = $coverImageBreakpoints[self::LARGE];

        }

        if ($breakpoint == self::LARGE) {
            $breakpointFileName = self::LARGE;
        } else if ($breakpoint == self::SMALL) {
            $breakpointFileName = self::SMALL;
        } else if ($breakpoint == self::MEDIUM) {
            $breakpointFileName = self::MEDIUM;
        }

        $destinationPathInfo = pathinfo($destinationPath);
        $destinationFilePath = $destinationPathInfo["dirname"];
        $destinationFileName = $destinationPathInfo["filename"];
        $destinationFileExt = $destinationPathInfo["extension"];
        $destinationPath = $destinationFilePath . "/" . $breakpointFileName . "." . $destinationFileExt;
        return $destinationPath;

    }

    public function createImage($type, $sourcePath, $destinationPath, $breakpoint)
    {

        // TODO
        // Fehlerhandling einbauen

        $manager = new ImageManager();

        $createCoverImage = function ($width, $height) use ($manager, $sourcePath, $destinationPath, $breakpoint, $type) {

            $manager->make($sourcePath)->fit($width, $height, function ($constraint) use ($breakpoint, $type) {
                $constraint->upsize();
            })->save($this->getBreakpointFileName($type, $destinationPath, $breakpoint));

        };

        //$image->setImageCompressionQuality(self::BEST_QUALITY);

        if ($type == self::COVER_IMAGE) {

            if ($breakpoint == self::LARGE) {
                $createCoverImage(self::LARGE_COVER_IMAGE_WIDTH, self::LARGE_COVER_IMAGE_HEIGHT);
            } else if ($breakpoint == self::SMALL) {
                $createCoverImage(self::SMALL_COVER_IMAGE_WIDTH, self::SMALL_COVER_IMAGE_HEIGHT);
            } else if ($breakpoint == self::MEDIUM) {
                $createCoverImage(self::MEDIUM_COVER_IMAGE_WIDTH, self::MEDIUM_COVER_IMAGE_HEIGHT);
            }

        }

    }

    public function getImagesByToken($type, $filePath, $token) {

        $images = [];

        if(!empty($token)) {

            $this->iterateAllBreakpoints(function($currentBreakpoint) use ($type, $token, $filePath, &$images) {
                
                $file = $this->getBreakpointFileName($type, $filePath, $currentBreakpoint);
                $file = file_exists($file) ? $file : null;

                if(!empty($file)) {

                    $cutFilePath = explode("uploads/", $file);
                    $fileUrl = 'https://' .  str_replace("api", "uploads", $_SERVER['SERVER_NAME']) . $cutFilePath[1];

                } else {

                    $fileUrl = null;

                }
                
                $images[$currentBreakpoint] = $fileUrl;

            });

        } else {

            $this->iterateAllBreakpoints(function($currentBreakpoint) use ($type, &$images) {
                $images[$type][$currentBreakpoint] = null;
            });

        }

        return $images;

    } 

}
