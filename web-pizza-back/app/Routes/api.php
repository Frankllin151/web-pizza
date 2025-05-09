<?php

/**
 * Definição de rotas para a API
 */

use App\Core\App;
use App\Controllers\Api\UserApiController;
use App\Controllers\Api\ProdutoPizzaController;

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
$router->post("/api/forget-passwod", [UserApiController::class, "forGetPassword"]);
$router->post("/api/update-senha", [UserApiController::class, "updatePass"]);
// login
$router->post("/api/login" , [UserApiController::class, "login"]);

// dashboard
$router->middleware('AuthMiddleware')->get('/api/dashboard', [UserApiController::class, 'dasHboard']);
$router->middleware("AdminUserMiddleware")->post("/api/dashboard/adicionar-pizza", [ProdutoPizzaController::class, "adicionaPizza"]);
$router->middleware("AdminUserMiddleware")->post("/api/dashboard/editar-pizza", [ProdutoPizzaController::class, "editarPizza"]);
$router->middleware("AdminUserMiddleware")->post("/api/dashboard/deletar-pizza", [ProdutoPizzaController::class, "deletarPizza"]);
// atulizar dados pelo routa protegida
$router->middleware("AuthMiddleware")->post("/api/dashboard/atualizar-senha",[UserApiController::class, "atualizarSenha"]);
