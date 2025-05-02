<?php

/**
 * Definição de rotas para a API
 */

use App\Core\App;
use App\Controllers\Api\UserApiController;
use App\Middleware\AuthMiddleware;

$router = App::getInstance()->getRouter();

$router->get("/api", function($request, $response) {
    $response->json([
        "message" => "Web-pizza",
        "PHP_VERSION" => "PHP_8.4.6",
        "status" => "OK"
    ]); 
});

// criar usuário
$router->post("/api/create-users" ,[UserApiController::class , "createUsers"]);
// esqueci minha senha -> email caixa

// login
$router->post("/api/login" , [UserApiController::class, "login"]);
// dashboard
$router->middleware('AuthMiddleware')->get('/api/dashboard', [UserApiController::class, 'dasHboard']);