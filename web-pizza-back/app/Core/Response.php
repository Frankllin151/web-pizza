<?php

namespace App\Core;

use App\Middleware\CorsMiddleware;

class Response
{
    public function setStatusCode(int $code)
    {
        http_response_code($code);
    }
    
    public function redirect(string $url)
    {
        header("Location: $url");
        exit;
    }
    
    public function json($data, int $statusCode = 200): void
    {
       
            $this->setStatusCode($statusCode);
            CorsMiddleware::handle();
            header('Content-Type: application/json');
            echo json_encode($data);
            exit;
        
       
    }
    
    public function render(string $view, array $data = []): void
{
    // Carregar o conteúdo do layout principal
    $layoutContent = $this->layoutContent();

    // Carregar o conteúdo da view
    $viewContent = $this->renderView($view, $data);

    // Substituir {{content}} pelo conteúdo da view no layout
    $content = str_replace('{{content}}', $viewContent, $layoutContent);

    // Exibir o conteúdo final
   echo $layoutContent . $viewContent;
}
    
    protected function layoutContent(): string
    {
        ob_start();
        include_once APP_ROOT . "/app/Views/layouts/main.php";
        return ob_get_clean();
    }
    
    protected function renderView($view, $data): string
{
    foreach ($data as $key => $value) {
        $$key = $value;
    }

    $viewPath = APP_ROOT . "/app/Views/$view.php";
   

  

    ob_start();
    include_once $viewPath;
    return ob_get_clean();
}
}