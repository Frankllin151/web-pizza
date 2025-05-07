<?php

namespace App\Models; 

class Pizzas extends BaseModel 
{
    protected string  $table = "pizzas";
    protected array $fillable = ["nome", "imagem" , "descricao"];
}