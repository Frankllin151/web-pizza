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

//Todos os produto 
$router->get("/api/data-get/produto", [ProdutoPizzaController::class, "selectAll"]);

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

// atulizar dados pelo routa protegida (senha,dados entrega e pessoal)
$router->middleware("AuthMiddleware")->post("/api/dashboard/atualizar-senha",[UserApiController::class, "atualizarSenha"]);
$router->middleware("AuthMiddleware")->post("/api/dashboard/atualizar-dados", [UserApiController::class, "updateDados"]);

// Delivey ou Entrega
$router->post("/api/dado/user-entrega-pay",[ProdutoPizzaController::class,"DadoPayUser"]);
$router->post("/api/dado/pay-all", [ProdutoPizzaController::class, "PayAll"]);
$router->get("/api/check-status-pay", [ProdutoPizzaController::class, "checkStatusPay"]);
