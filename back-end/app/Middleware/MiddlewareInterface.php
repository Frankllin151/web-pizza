<?php

namespace App\Middleware;

use App\Core\Request;
use App\Core\Response;

interface MiddlewareInterface
{
    /**
     * Processa a middleware
     * 
     * @param Request $request A requisição atual
     * @param Response $response A resposta atual
     * @param callable $next A próxima middleware na pilha
     */
    public function handle(Request $request, Response $response, callable $next);
}