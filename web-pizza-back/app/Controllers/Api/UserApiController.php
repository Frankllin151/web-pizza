<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\User;
use App\Core\Request;
use App\Core\Response;

class UserApiController extends BaseController
{
    private User $userModel;
    
    public function __construct()
    {
        $this->userModel = new User();
    }
    
    /**
     * Retorna lista de usuários
     */
    public function index(Request $request, Response $response): void
    {
        $users = ["name"];
        
      $response->json([
        "dados_users" => $users
      ]);  
    }

    public function createUsers(Request $request , Response $response)
    {
      $body = $request->getBody();
      $this->vaLidar($body, $response);
      $email = $this->userModel->findByEmail($body["email"]);
      if($email === false){
        $token = bin2hex(random_bytes(16));
        $body["token"] = $token;
        $body["senha"] = password_hash($body["senha"], PASSWORD_DEFAULT);


        $create = $this->userModel->create($body);
        if($create  <= 0){
          $response->json([
            "flash" => "Ocorreu algum error" . $create,
          ]);
        }
        $response->json([
          "flash" => "Usuário criado com sucesso: " . $create
        ]);

        exit;
      } else if(is_array($email)){
        $response->json([
          "flash" => "Esse email já existem",
          "email"  => $body["email"]
        ]);
        exit;
      }
      
    }
    private function vaLidar($body, $response)
    {
     if(empty($body["nome"]) || empty(["email"]) || empty($body["senha"])){
      $response->json(
        ["Dados invalido"]
      );
      exit;
     }
    }
    
   

    }