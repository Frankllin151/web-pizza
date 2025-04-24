<?php

/**
 * Definição de rotas para a web
 */

use App\Controllers\UserController;
use App\Core\App;
$router = App::getInstance()->getRouter();

// Rota para a página inicial
$router->get('/', function($request, $response) {
    $response->render('layouts/main', [
        'title' => 'Bem-vindo',
        'content' => '<h1>Bem-vindo ao MVC Framework PHP</h1><p>Framework MVC simples criado com PHP 8.4</p>'
    ]);
});

// Rotas para usuários
$router->get('/users', [UserController::class, 'index']);
$router->get('/users/create', [UserController::class, 'create']);
$router->post('/users', [UserController::class, 'store']);
$router->get('/users/{id}', [UserController::class, 'show']);
$router->get('/users/{id}/edit', [UserController::class, 'edit']);
$router->put('/users/{id}', [UserController::class, 'update']);
$router->delete('/users/{id}', [UserController::class, 'destroy']);
