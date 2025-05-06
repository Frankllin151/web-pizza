<?php 

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Core\Request;
use App\Core\Response;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Models\User;

class ProdutoPizzaController extends BaseController
{
   
  
    public function adicionaPizza(Request $request, Response $response)
    {
    $data = $request->getBody();
    $user = $request->user;
    $response->json([
    $data
    ]);
    }
}