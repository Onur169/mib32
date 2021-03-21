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
    const TESTIMONIALS_IMAGE = "testimonials_image";
    const ALLIANCES_IMAGE = "alliances_image";

    const LARGE_TESTIMONIALS_IMAGE_WIDTH = 400;
    const LARGE_TESTIMONIALS_IMAGE_HEIGHT = 260;
    const MEDIUM_TESTIMONIALS_IMAGE_WIDTH = 300;
    const MEDIUM_TESTIMONIALS_IMAGE_HEIGHT = 200;
    const SMALL_TESTIMONIALS_IMAGE_WIDTH = 160;
    const SMALL_TESTIMONIALS_IMAGE_HEIGHT = 160;

    const LARGE_ALLIANCES_IMAGE_WIDTH = 208;
    const LARGE_ALLIANCES_IMAGE_HEIGHT = 114;
    const MEDIUM_ALLIANCES_IMAGE_WIDTH = 208;
    const MEDIUM_ALLIANCES_IMAGE_HEIGHT = 114;
    const SMALL_ALLIANCES_IMAGE_WIDTH = 142;
    const SMALL_ALLIANCES_IMAGE_HEIGHT = 105;

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

    public function getTestimonialsImageBreakpointDimensions()
    {
        return [
            self::LARGE => [
                self::WIDTH => self::LARGE_TESTIMONIALS_IMAGE_WIDTH,
                self::HEIGHT => self::LARGE_TESTIMONIALS_IMAGE_HEIGHT,
            ],
            self::SMALL => [
                self::WIDTH => self::SMALL_TESTIMONIALS_IMAGE_WIDTH,
                self::HEIGHT => self::SMALL_TESTIMONIALS_IMAGE_HEIGHT,
            ],
            self::MEDIUM => [
                self::WIDTH => self::MEDIUM_TESTIMONIALS_IMAGE_WIDTH,
                self::HEIGHT => self::MEDIUM_TESTIMONIALS_IMAGE_HEIGHT,
            ],
        ];
    }

    public function getAlliancesImageBreakpointDimensions()
    {
        return [
            self::LARGE => [
                self::WIDTH => self::LARGE_ALLIANCES_IMAGE_WIDTH,
                self::HEIGHT => self::LARGE_ALLIANCES_IMAGE_HEIGHT,
            ],
            self::SMALL => [
                self::WIDTH => self::SMALL_ALLIANCES_IMAGE_WIDTH,
                self::HEIGHT => self::SMALL_ALLIANCES_IMAGE_HEIGHT,
            ],
            self::MEDIUM => [
                self::WIDTH => self::MEDIUM_ALLIANCES_IMAGE_WIDTH,
                self::HEIGHT => self::MEDIUM_ALLIANCES_IMAGE_HEIGHT,
            ],
        ];
    }

    public function getBreakpointFileName($destinationPath, $breakpoint)
    {

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

    public function processImage($width, $height, $breakpoint, $sourcePath, $destinationPath) {

        $manager = new ImageManager();

        $manager->make($sourcePath)->fit($width, $height, function ($constraint) use ($breakpoint) {
            $constraint->upsize();
        })->save($this->getBreakpointFileName($destinationPath, $breakpoint));

    }

    public function createImage($type, $sourcePath, $destinationPath)
    {

        //$image->setImageCompressionQuality(self::BEST_QUALITY);

        if ($type == self::TESTIMONIALS_IMAGE) {
            $breakpoint = self::getTestimonialsImageBreakpointDimensions();
        } else if ($type == self::ALLIANCES_IMAGE) {
            $breakpoint = self::getAlliancesImageBreakpointDimensions();
        }

        $this->processImage($breakpoint[self::LARGE][self::WIDTH], $breakpoint[self::LARGE][self::HEIGHT], self::LARGE, $sourcePath, $destinationPath);
        $this->processImage($breakpoint[self::MEDIUM][self::WIDTH], $breakpoint[self::MEDIUM][self::HEIGHT], self::MEDIUM, $sourcePath, $destinationPath);
        $this->processImage($breakpoint[self::SMALL][self::WIDTH], $breakpoint[self::SMALL][self::HEIGHT], self::SMALL, $sourcePath, $destinationPath);

    }

    public function getImagesByToken($type, $filePath, $token) {

        $images = [];

        if(!empty($token)) {

            $this->iterateAllBreakpoints(function($currentBreakpoint) use ($type, $token, $filePath, &$images) {
                
                $file = $this->getBreakpointFileName($filePath, $currentBreakpoint);
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
