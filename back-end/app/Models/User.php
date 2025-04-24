<?php

namespace App\Models;

class User extends BaseModel
{
    protected string $table = 'users';
    protected array $fillable = ['name', 'email', 'password', 'created_at', 'updated_at'];
    
    /**
     * Encontra um usuário pelo email
     */
    public function findByEmail(string $email): array|false
    {
        return $this->findOneWhere('email = :email', [':email' => $email]);
    }
    
    /**
     * Verifica se o email e senha são válidos
     */
    public function authenticate(string $email, string $password): array|false
    {
        $user = $this->findByEmail($email);
        
        if (!$user) {
            return false;
        }
        
        if (password_verify($password, $user['password'])) {
            return $user;
        }
        
        return false;
    }
    
    /**
     * Sobrescreve o método create para adicionar timestamps
     */
    public function create(array $data): int
    {
        $data['created_at'] = date('Y-m-d H:i:s');
        $data['updated_at'] = date('Y-m-d H:i:s');
        
        return parent::create($data);
    }
    
    /**
     * Sobrescreve o método update para atualizar o timestamp
     */
    public function update(int $id, array $data): bool
    {
        $data['updated_at'] = date('Y-m-d H:i:s');
        
        return parent::update($id, $data);
    }
}