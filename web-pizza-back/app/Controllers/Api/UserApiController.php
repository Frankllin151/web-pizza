<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\User;
use App\Core\Request;
use App\Core\Response;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
        $body["senha"] = password_hash($body["senha"], PASSWORD_DEFAULT);


        $create = $this->userModel->create($body);
        if($create  <= 0){
          $response->json([
            "flash" => "Ocorreu algum error" . $create,
          ]);
        }
        $response->json([
          "flash" => "Usuário criado com sucesso: ir para tela de login" . $create
        ]);

        exit;
      } else if(is_array($email)){
        $response->json([
          "flash" => "Esse email já existem: Messagem de alerta",
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
    
 public function dasHboard(Request $request, Response $response)
 {
  $user = $request->user;

  return $response->json([
  $user
]);

exit;
 }


 public function login(Request $request, Response $response)
 {
 $data = $request->getBody();
  
 $email = $data["email"] ?? null; 
 $password = $data["senha"] ?? null;

 if(!$email || !$password){
  return $response->json(['error' => 'Email e senha são obrigatórios.'], 400);
  exit;
 }

 $user = $this->userModel->authenticate($email, $password);

 if (!$user) {
  return $response->json(['error' => 'Credenciais inválidas.'], 401);
  exit;
}

 // Gera token simples (pode usar UUID, random_bytes etc.)
 $token = bin2hex(random_bytes(32));

 // Salva token no banco
 $this->userModel->update($user[0]['id'], ['token' => $token]);

 // Remove a senha antes de responder
 unset($user[0]['senha']);
 $request->user = $user;
 return $response->json([
     'message' => 'Login realizado com sucesso.',
     'user' => $request->user,
     'token' => $token
 ]);

}
public function forGetPassword(Request $request , Response $response)
{
 $data = $request->getBody();

 $mail = new PHPMailer(true);
 
 try{
  $mail->isSMTP();
  $mail->Host = $_ENV["HOST_SMTP"]; // ou smtp.gmail.com, etc.
  $mail->SMTPAuth = true;
  $mail->Username = $_ENV["USER_NAME_SMTP"];
  $mail->Password = $_ENV['PASSWORD_SMTP'];
  $mail->Port = $_ENV["PORT_SMTP"];

  $mail->setFrom($_ENV["EMAIL_SMTP"] , "Web-pizza");
  $mail->addAddress($data["email"]);

  $mail->isHTML(true); // ⚠️ ATIVAR HTML
  $mail->Subject = 'Esquece minha senha Web-pizza';
  
  $mail->Body = file_get_contents(APP_ROOT . "/app/Views/email/forget.html");
  
  $mail->AltBody = 'Este é o conteúdo alternativo para e-mail que não suportam HTML.';

  $mail->send();
  $response->json([
    "success" => "Verificar na caixa do email" . APP_ROOT
  ]);
 } catch (Exception $e){
  $response->json([
    "error" => 'Email não enviado!' . $e],  401);
 }

}
    }