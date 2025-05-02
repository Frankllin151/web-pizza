<?php

namespace App\Middleware;

use App\Core\Request;
use App\Core\Response;
use App\Models\User;
class AuthMiddleware implements MiddlewareInterface
{
    /**
     * Processa a middleware de autenticação
     * 
     * 
     */
    public function handle(Request $request, Response $response, callable $next)
    {
       
        $token = $request->getBearerToken(); 
        if (!$token) {
            $response->json(['error' => "Não autorizado. Token não fornecido."], 401);
            exit;
        }

        // Procurar o usuário pelo token
        $userModel = new User();
        $user = $userModel->findOneWhere('token = :token', [':token' => $token]);

        if (!$user) {
            $response->json(['error' => 'Token inválido.'], 401);
            exit;
        }

        // Armazenar o usuário na requisição para uso posterior
        $request->user = $user;

        // Continuar o processamento
        return $next();
    }
}