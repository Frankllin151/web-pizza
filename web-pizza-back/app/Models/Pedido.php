<?php

namespace App\Models; 

class Pedido extends BaseModel 
{
    protected string  $table = "pedidos";
     protected array $fillable = [
        'cliente',
        'user_id',
        'status',
        'data',
        'total',
        'id_pagamento',
        'metodo_pagamento',
        // não coloque 'itens' aqui, pois não existe na tabela pedidos
    ];


    
}