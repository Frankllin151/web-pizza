<?php

namespace App\Models; 

class PedidoItens extends BaseModel 
{
    protected string  $table = "pedido_itens";
     protected array $fillable = [
        'pedido_id',
        'pizza_id', 
        'quantidade',
        'tamanho'
    ];


    
}