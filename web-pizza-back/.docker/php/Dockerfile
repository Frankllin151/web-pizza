FROM php:8.4-fpm

# Instalar dependências
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libonig-dev \
    libicu-dev

# Instalar extensões PHP
RUN docker-php-ext-install \
    pdo_mysql \
    mysqli \
    zip \
    mbstring \
    intl

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar arquivos do projeto
COPY . /var/www/html

# Instalar dependências via Composer
RUN composer install --no-interaction --optimize-autoloader

# Ajustar permissões
RUN chown -R www-data:www-data /var/www/html