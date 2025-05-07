<?php

namespace App\Models; 

class PizzaPreco extends BaseModel 
{
    protected string  $table = "pizza_precos";
    protected array $fillable = ["pizza_id", "tamanho" , "preco"];


    
}