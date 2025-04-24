<?php

return [
    'name' => $_ENV['APP_NAME'] ?? 'PHP MVC Framework',
    'env' => $_ENV['APP_ENV'] ?? 'production',
    'debug' => $_ENV['APP_DEBUG'] === 'true',
    'url' => $_ENV['APP_URL'] ?? 'http://localhost',
    
    'timezone' => 'UTC',
    'locale' => 'pt_BR',
    
    'providers' => [
        // Lista de provedores de serviço
    ],
    
    'middleware' => [
        // Middleware global
    ],
];