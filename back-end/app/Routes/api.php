<?php

/**
 * Definição de rotas para a API
 */

use App\Core\App;
use App\Controllers\Api\UserApiController;
$router = App::getInstance()->getRouter();

$router->get("/api", function($request, $response) {
    $response->json([
        "message" => "Bem-Vindo á api",
        "PHP_VERSION" => phpinfo(),
        "status" => "OK"
    ]); 
});

$router->get("/api/users" , [UserApiController::class , "index"]);