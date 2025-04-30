<?php
/**
 * Ponto de entrada da aplicação
 */

// Carregar autoloader do Composer
require_once __DIR__ . '/../vendor/autoload.php';
use App\Middleware\CorsMiddleware;
// Carregar variáveis de ambiente
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();
CorsMiddleware::handle();
// Definir constantes globais
define('APP_ROOT', dirname(__DIR__));
define('BASE_URL', "localhost:8383");

// Inicializar aplicação
$app = new App\Core\App();
$app->run();