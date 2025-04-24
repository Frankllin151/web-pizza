# 🧱 Framework PHP Customizado com Docker

Este projeto é um framework PHP simples baseado em arquitetura MVC, pronto para ser executado com Docker e fácil de estender.

---

## 🚀 Como utilizar

### 1. Clone o repositório e inicialize o ambiente:

```bash
git clone https://seurepositorio.com
cd nome-do-projeto
docker-compose up -d
```

### 2. Instale as dependências:

```bash
composer install
```

### 3. Crie a estrutura do banco de dados:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 📁 Estrutura do Projeto

```
.
├── app/           # Lógica principal da aplicação (MVC)
├── public/        # Ponto de entrada da aplicação (index.php)
├── config/        # Arquivos de configuração
├── .docker/       # Configurações de ambiente Docker
├── storage/       # Logs, cache e arquivos temporários
├── composer.json  # Dependências PHP
```

---

## 🔄 Fluxo da Aplicação

1. A requisição chega ao `public/index.php`
2. O autoloader do Composer e as variáveis de ambiente são carregados
3. A aplicação é inicializada (`App.php`)
4. O Router identifica a URL e o método da requisição
5. O Controller apropriado é chamado
6. Middlewares aplicáveis são executados
7. O Controller processa a requisição e retorna uma resposta

---

## 🧩 Como adicionar novos recursos

### ✅ Criar um modelo (Model)

1. Crie um arquivo em `app/Models/`
2. Estenda a classe `BaseModel`
3. Defina a tabela e os campos permitidos:

```php
protected string $table = 'products';
protected array $fillable = ['name', 'price', 'description'];
```

---

### ✅ Criar um controller

1. Crie a classe em `app/Controllers/`
2. Estenda a classe `BaseController`
3. Implemente os métodos desejados (`index`, `show`, `store`, `update`, `destroy`)

---

### ✅ Adicionar novas rotas

1. Edite os arquivos:

- `app/Routes/web.php` → Rotas web
- `app/Routes/api.php` → Rotas de API

2. Use o router para definir suas rotas:

```php
$router->get('/products', [ProductController::class, 'index']);
$router->post('/products', [ProductController::class, 'store']);
```

---

### 🔐 Criar rotas protegidas com middleware

```php
$router->middleware('AuthMiddleware')->get('/admin/users', [AdminController::class, 'index']);
```

---

### 🔧 Criar um novo middleware

1. Crie uma classe em `app/Middleware/`
2. Implemente a interface `MiddlewareInterface`
3. Implemente o método `handle()` com sua lógica personalizada
