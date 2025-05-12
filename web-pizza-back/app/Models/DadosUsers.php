<?php 

namespace App\Models;

class DadosUsers extends BaseModel 
{
    protected string $table = "dados_users"; 
    
    // Campos permitidos para criação e atualização
    protected array $fillable = [
        'user_id',
        'cpf',
        'telefone',
        'rua_avenida',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'nome_cartao',
        'numero_cartao',
        'validade_cartao',
        'cvv',
        'created_at',
        'updated_at'
    ];
}
