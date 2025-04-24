<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;

abstract class BaseController
{
    public Request $request;
    public Response $response;
    
    /**
     * Renderiza uma view com os dados fornecidos
     */
    protected function render(string $view, array $data = []): void
    {
        $this->response->render($view, $data);
        
    }
    
    /**
     * Retorna uma resposta JSON
     */
    protected function json($data, int $statusCode = 200): void
    {
        $this->response->json($data, $statusCode);
    }
    
    /**
     * Redireciona para uma URL específica
     */
    protected function redirect(string $url): void
    {
        $this->response->redirect($url);
    }
}