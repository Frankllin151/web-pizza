<?php

namespace App\Core;

class Request
{
    private array $params = [];
    
    public function getMethod(): string
    {
        return strtolower($_SERVER['REQUEST_METHOD']);
    }
    
    public function getUrl(): string
    {
        $path = $_SERVER['REQUEST_URI'] ?? '/';
        $position = strpos($path, '?');
        $url = $position === false ? $path : substr($path, 0, $position);
        error_log("URL capturada: $url");
        return $url;
        
    }
    
    public function isGet(): bool
    {
        return $this->getMethod() === 'get';
    }
    
    public function isPost(): bool
    {
        return $this->getMethod() === 'post';
    }
    
    public function isPut(): bool
    {
        return $this->getMethod() === 'put';
    }
    
    public function isDelete(): bool
    {
        return $this->getMethod() === 'delete';
    }
    
    public function getBody(): array
    {
        $body = [];
        
        if ($this->isGet()) {
            foreach ($_GET as $key => $value) {
                $body[$key] = filter_input(INPUT_GET, $key, FILTER_SANITIZE_SPECIAL_CHARS);
            }
        }
        
        if ($this->isPost() || $this->isPut() || $this->isDelete()) {
            // Para formulários POST tradicionais
            foreach ($_POST as $key => $value) {
                $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
            }
            
            // Para requisições da API (application/json)
            $contentType = $_SERVER["CONTENT_TYPE"] ?? '';
            if (strpos($contentType, 'application/json') !== false) {
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);
                if ($data) {
                    $body = array_merge($body, $data);
                }
            }
        }
        
        return $body;
    }
    
    public function setParams(array $params): void
    {
        $this->params = $params;
    }
    
    public function getParam(string $param): string|null
    {
        return $this->params[$param] ?? null;
    }
    
    public function getParams(): array
    {
        return $this->params;
    }
    
    public function getBearerToken(): ?string
    {
        $headers = $this->getAuthorizationHeader();
        
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        
        return null;
    }
    
    private function getAuthorizationHeader(): ?string
    {
        $headers = null;
        
        if (isset($_SERVER['Authorization'])) {
            $headers = $_SERVER['Authorization'];
        } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = $_SERVER['HTTP_AUTHORIZATION'];
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $requestHeaders = array_combine(
                array_map('ucwords', array_keys($requestHeaders)),
                array_values($requestHeaders)
            );
            
            if (isset($requestHeaders['Authorization'])) {
                $headers = $requestHeaders['Authorization'];
            }
        }
        
        return $headers;
    }
}