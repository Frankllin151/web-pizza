<?php
namespace App\Middleware;

class CorsMiddleware {
    public static function handle() {
        header("Access-Control-Allow-Origin:  *");
        header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
        header("Access-Control-Allow-Headers: Authorization, Content-Type");
        header("Access-Control-Max-Age: 86400");

        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }
    }
}
