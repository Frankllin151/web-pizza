<?php

namespace App\Core;

use App\Middleware\MiddlewareInterface;

class Router
{
    private array $routes = [];
    private Request $request;
    private Response $response;
    private array $middlewares = [];
    
    public function __construct(Request $request, Response $response)
    {
        $this->request = $request;
        $this->response = $response;
    }
    
    public function get(string $path, $callback): self
    {
        $this->routes['get'][$path] = [
            'callback' => $callback,
            'middlewares' => $this->middlewares
        ];
        // Limpa middlewares para próximas rotas
        $this->middlewares = [];
        return $this;
    }
    
    public function post(string $path, $callback): self
    {
        $this->routes['post'][$path] = [
            'callback' => $callback,
            'middlewares' => $this->middlewares
        ];
        $this->middlewares = [];
        return $this;
    }
    
    public function put(string $path, $callback): self
    {
        $this->routes['put'][$path] = [
            'callback' => $callback,
            'middlewares' => $this->middlewares
        ];
        $this->middlewares = [];
        return $this;
    }
    
    public function delete(string $path, $callback): self
    {
        $this->routes['delete'][$path] = [
            'callback' => $callback,
            'middlewares' => $this->middlewares
        ];
        $this->middlewares = [];
        return $this;
    }
    
    public function middleware(string|array $middleware): self
    {
        if (is_string($middleware)) {
            $this->middlewares[] = $middleware;
        } elseif (is_array($middleware)) {
            $this->middlewares = array_merge($this->middlewares, $middleware);
        }
        
        return $this;
    }
    
    /**
     * Resolve a rota com base na URL e método da requisição
     */
    public function resolve()
    {
        $method = $this->request->getMethod();
        $url = $this->request->getUrl();
        $url = trim($url, '/');
    
        // Adiciona a barra inicial à URL capturada
        $url = '/' . $url;
    
        // Normaliza a URL para não ter barra no final
        if ($url !== '/' && substr($url, -1) === '/') {
            $url = rtrim($url, '/');
            $this->response->redirect($url);
        }
    
      
    
        // Inicializa a rota e os parâmetros
        $routeInfo = null;
        $params = [];
        $routeFound = false;
    
        // Verificar rotas estáticas primeiro
        if (isset($this->routes[$method][$url])) {
            $routeInfo = $this->routes[$method][$url];
            $routeFound = true;
        } else {
            // Verificar rotas dinâmicas com parâmetros
            foreach ($this->routes[$method] ?? [] as $route => $info) {
                if (strpos($route, '{') !== false) {
                    $pattern = preg_replace('/{([a-zA-Z0-9_]+)}/', '(?P<$1>[^/]+)', $route);
                    $pattern = "#^$pattern$#";
    
                    if (preg_match($pattern, $url, $matches)) {
                        $routeInfo = $info;
                        $routeFound = true;
    
                        foreach ($matches as $key => $value) {
                            if (is_string($key)) {
                                $params[$key] = $value;
                            }
                        }
    
                        break;
                    }
                }
            }
        }
    
        if (!$routeFound) {
           
            $this->response->setStatusCode(404);
            //echo "Página não encontrada";
            return;
        }
    
      
    
        $this->request->setParams($params);
    
        foreach ($routeInfo['middlewares'] as $middleware) {
        
            $middlewareInstance = $this->resolveMiddleware($middleware);
            $middlewareInstance->handle($this->request, $this->response, function() {});
        }
    
        $callback = $routeInfo['callback'];
    
      
    
        if (is_array($callback)) {
            if (is_string($callback[0])) {
                $callback[0] = new $callback[0]();
            }
    
            $callback[0]->request = $this->request;
            $callback[0]->response = $this->response;
        }
    
        return call_user_func($callback, $this->request, $this->response);
    }
    
    /**
     * Resolver middleware pelo nome
     */
    private function resolveMiddleware(string $middleware): MiddlewareInterface
    {
        $middlewareClass = "App\\Middleware\\{$middleware}";
        
        if (!class_exists($middlewareClass)) {
            throw new \Exception("Middleware class '$middlewareClass' not found");
        }
        
        return new $middlewareClass();
    }
    
    /**
     * Define um grupo de rotas com um prefixo comum
     */
    public function group(string $prefix, callable $callback): void
    {
        $previousMiddlewares = $this->middlewares;
        $callback($this);
        $this->middlewares = $previousMiddlewares;
    }
}