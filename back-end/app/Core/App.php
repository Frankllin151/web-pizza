<?php

namespace App\Core;

class App
{
    private static $instance;
    private Router $router;
    private Request $request;
    private Response $response;
    
    public function __construct()
    {
        self::$instance = $this;
        $this->request = new Request();
        $this->response = new Response();
        $this->router = new Router($this->request, $this->response);
        
        // Carregar rotas
        require_once APP_ROOT . '/app/Routes/web.php';
        require_once APP_ROOT . '/app/Routes/api.php';
    }
    
    public function run()
    {
        try {
            $this->router->resolve();
        } catch (\Exception $e) {
            // Gerenciar exceções
            if ($_ENV['APP_DEBUG'] === 'true') {
                echo $e->getMessage();
            } else {
                $this->response->setStatusCode(500);
                echo "Internal Server Error";
            }
        }
    }
    
    public static function getInstance(): self
    {
        return self::$instance;
    }
    
    public function getRouter(): Router
    {
        return $this->router;
    }
    
    public function getRequest(): Request
    {
        return $this->request;
    }
    
    public function getResponse(): Response
    {
        return $this->response;
    }
}