<?php

namespace App\Middleware;

use App\Core\Request;
use App\Core\Response;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware implements MiddlewareInterface
{
    /**
     * Processa a middleware de autenticação
     * 
     * Verifica se o usuário está autenticado via JWT
     */
    public function handle(Request $request, Response $response, callable $next)
    {
        $token = $request->getBearerToken();
        
        if (!$token) {
            $response->json(['error' => 'Não autorizado. Token não fornecido.'], 401);
            exit;
        }
        
        try {
            $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
            
            // Armazenar o usuário decodificado na requisição para uso posterior
            $request->user = $decoded;
            
            // Continuar para a próxima middleware/controlador
            return $next();
        } catch (\Exception $e) {
            $response->json(['error' => 'Token inválido ou expirado.'], 401);
            exit;
        }
    }
}