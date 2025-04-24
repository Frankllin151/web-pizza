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
        $users = $this->userModel->findAll();
        
      $response->json([
        "dados_users" => $users
      ]);  
    }
    
   

    }