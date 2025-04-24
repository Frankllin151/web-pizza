<?php

namespace App\Core;

class Database
{
    private static $instance = null;
    private \PDO $pdo;
    
    private function __construct()
    {
        $dsn = "{$_ENV['DB_CONNECTION']}:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']};dbname={$_ENV['DB_DATABASE']}";
        $options = [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        try {
            $this->pdo = new \PDO($dsn, $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $options);
        } catch (\PDOException $e) {
            throw new \Exception("Erro de conexão com o banco de dados: " . $e->getMessage());
        }
    }
    
    public static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        
        return self::$instance;
    }
    
    public function getConnection(): \PDO
    {
        return $this->pdo;
    }
    
    public function query($sql, $params = []): \PDOStatement
    {
        $statement = $this->pdo->prepare($sql);
        $statement->execute($params);
        return $statement;
    }
    
    public function fetch($sql, $params = []): array|false
    {
        return $this->query($sql, $params)->fetch();
    }
    
    public function fetchAll($sql, $params = []): array
    {
        return $this->query($sql, $params)->fetchAll();
    }
    
    public function create(string $table, array $data): int
    {
        $columns = implode(', ', array_keys($data));
        $placeholders = implode(', ', array_fill(0, count($data), '?'));
        
        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
        $this->query($sql, array_values($data));
        
        return (int) $this->pdo->lastInsertId();
    }
    
    public function update(string $table, array $data, string $condition, array $params = []): int
    {
        $set = [];
        foreach (array_keys($data) as $column) {
            $set[] = "$column = ?";
        }
        
        $sql = "UPDATE $table SET " . implode(', ', $set) . " WHERE $condition";
        $stmt = $this->query($sql, array_merge(array_values($data), $params));
        
        return $stmt->rowCount();
    }
    
    public function delete(string $table, string $condition, array $params = []): int
    {
        $sql = "DELETE FROM $table WHERE $condition";
        $stmt = $this->query($sql, $params);
        
        return $stmt->rowCount();
    }
}