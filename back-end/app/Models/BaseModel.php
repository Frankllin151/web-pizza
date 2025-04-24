<?php

namespace App\Models;

use App\Core\Database;

abstract class BaseModel
{
    protected string $table;
    protected string $primaryKey = 'id';
    protected array $fillable = [];
    protected \PDO $db;
    
    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }
    
    /**
     * Encontra um registro pelo ID
     */
    public function findById(int $id): array|false
    {
        $sql = "SELECT * FROM {$this->table} WHERE {$this->primaryKey} = :id LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetch();
    }
    
    /**
     * Encontra todos os registros da tabela
     */
    public function findAll(): array
    {
        $sql = "SELECT * FROM {$this->table}";
        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        
        return $stmt->fetchAll();
    }
    
    /**
     * Encontra registros com base em condições
     */
    public function findWhere(string $conditions, array $params = []): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE $conditions";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        
        return $stmt->fetchAll();
    }
    
    /**
     * Encontra um único registro com base em condições
     */
    public function findOneWhere(string $conditions, array $params = []): array|false
    {
        $sql = "SELECT * FROM {$this->table} WHERE $conditions LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        
        return $stmt->fetch();
    }
    
    /**
     * Cria um novo registro
     */
    public function create(array $data): int
    {
        // Filtra apenas os campos permitidos
        $data = array_intersect_key($data, array_flip($this->fillable));
        
        $columns = implode(', ', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));
        
        $sql = "INSERT INTO {$this->table} ($columns) VALUES ($placeholders)";
        $stmt = $this->db->prepare($sql);
        
        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        
        $stmt->execute();
        
        return (int) $this->db->lastInsertId();
    }
    
    /**
     * Atualiza um registro existente
     */
    public function update(int $id, array $data): bool
    {
        // Filtra apenas os campos permitidos
        $data = array_intersect_key($data, array_flip($this->fillable));
        
        $sets = [];
        foreach (array_keys($data) as $column) {
            $sets[] = "$column = :$column";
        }
        
        $sql = "UPDATE {$this->table} SET " . implode(', ', $sets) . " WHERE {$this->primaryKey} = :id";
        $stmt = $this->db->prepare($sql);
        
        $stmt->bindValue(':id', $id, \PDO::PARAM_INT);
        
        foreach ($data as $key => $value) {
            $stmt->bindValue(":$key", $value);
        }
        
        $stmt->execute();
        
        return $stmt->rowCount() > 0;
    }
    
    /**
     * Exclui um registro
     */
    public function delete(int $id): bool
    {
        $sql = "DELETE FROM {$this->table} WHERE {$this->primaryKey} = :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id, \PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->rowCount() > 0;
    }
}