<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Core\Request;
use App\Core\Response;
use App\Models\DadosUsers;
use App\Models\User;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class UserApiController extends BaseController
{
    private User $userModel;
    private DadosUsers $dadosUserModel;
    public function __construct()
    {
      $this->dadosUserModel = new DadosUsers();
        $this->userModel = new User();
    }

    private function validarCampos(array $data, array $camposObrigatorios)
{
    foreach ($camposObrigatorios as $campo) {
        if (!isset($data[$campo]) || $data[$campo] === null || $data[$campo] === '' || $data[$campo] === '""') {
            return [
                'success' => false,
                'error' => "O campo '{$campo}' está vazio ou inválido."
            ];
        }

        // Verificação adicional: se for o campo 'tamanhos', ele não pode ser um array vazio
        if ($campo === 'tamanhos' && is_array($data[$campo]) && count($data[$campo]) === 0) {
            return [
                'success' => false,
                'error' => "O campo 'tamanhos' não pode estar vazio."
            ];
        }
    }

    return ['success' => true];
}

    
    /**
     * Retorna lista de usuários
     */
  
     public function createUsers(Request $request , Response $response)
     {
         $body = $request->getBody();
         $this->vaLidar($body, $response);
     
         $email = $this->userModel->findByEmail($body["email"]);
     
         if ($email === false) {
             $body["senha"] = password_hash($body["senha"], PASSWORD_DEFAULT);
     
             // Cria o usuário e obtém o ID
             $userId = $this->userModel->create($body);
     
             if ($userId <= 0) {
               return  $response->json([
                     "flash" => "Ocorreu algum erro ao criar o usuário.",
                 ]);
               
             }
     
             // Agora insere dados complementares na tabela dados_users
             $dadosUsersModel = new DadosUsers();
     
             $dadosUsersModel->create([
                 'user_id' => $userId,
                 'cpf' => $body['cpf'] ?? null,
                 'telefone' => $body['telefone'] ?? null,
                 'rua_avenida' => $body['rua_avenida'] ?? null,
                 'numero' => $body['numero'] ?? null,
                 'complemento' => $body['complemento'] ?? null,
                 'bairro' => $body['bairro'] ?? null,
                 'cidade' => $body['cidade'] ?? null,
                 'nome_cartao' => $body['nome_cartao'] ?? null,
                 'numero_cartao' => $body['numero_cartao'] ?? null,
                 'validade_cartao' => $body['validade_cartao'] ?? null,
                 'cvv' => $body['cvv'] ?? null,
                 'created_at' => date('Y-m-d H:i:s'),
                 'updated_at' => date('Y-m-d H:i:s')
             ]);
     
            return $response->json([
                 "flash" => "Usuário criado com sucesso!"
             ]);
            
         } elseif (is_array($email)) {
             return $response->json([
                 "flash" => "Esse email já existe.",
                 "email" => $body["email"]
             ]);
             
         }
     }
     
    private function vaLidar($body, $response)
    {
     if(empty($body["nome"]) || empty(["email"]) || empty($body["senha"])){
    return  $response->json(
        ["Dados invalido"]
      );
    
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

    if (!$email || !$password) {
        return $response->json(['error' => 'Email e senha são obrigatórios.'], 400);
    }

    $user = $this->userModel->authenticate($email, $password);

    if (!$user) {
        return $response->json(['error' => 'Credenciais inválidas.'], 401);
    }

    // Se já existe um token, usa ele; senão, gera um novo
    $token = $user[0]['token'] ?? null;
    if (!$token) {
        $token = bin2hex(random_bytes(32));
        $this->userModel->update($user[0]['id'], ['token' => $token]);
    }

    // Busca dados complementares do usuário
    $dadosUserModel = new \App\Models\DadosUsers();
    $dadosUser = $dadosUserModel->findWhere('user_id = :user_id', [':user_id' => $user[0]['id']]);
    
    // Remove a senha antes de responder
    unset($user[0]['senha']);

    // Monta o retorno com os dados do usuário e dados complementares
    $userData = [
        'info' => $user[0],
        'dados' => $dadosUser[0] ?? null
    ];

    $request->user = $userData;
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
 $mail->CharSet = 'UTF-8'; // Define a codificação como UTF-8
$mail->Encoding = 'base64';

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
    "success" => "Verificar na caixa do seu email"
  ]);
 } catch (Exception $e){
  $response->json([
    "error" => 'Email não enviado!' . $e],  401);
 }

}

public function updatePass(Request $request , Response $response)
{
  $data = $request->getBody();
  $senha =$data["senha"] ?? null;  
  $confirmSenha = $data["confirm_senha"]  ?? null;
  $email = $data["email"];
  
  if($senha === null ||  $confirmSenha === null || $email === null){
    return $response->json([
     "success" => false, 
     "message" => "Campos senha e Confirma senha são obrigatório"
    ]);
  
  }

  if($senha === "" ||  $confirmSenha === "" || $email === ""){
    return $response->json([
     "success" => false, 
     "message" => "Campos senha e Confirma senha são obrigatório"
    ]);
  
  }

  if($senha !== $confirmSenha){
    return $response->json([
      "success" => false , 
      "message"=> "As senhas não coincidem"
    ]);
 
  }


  $arrayUser =$this->userModel->findUser($email);
  if($arrayUser === false || empty($arrayUser)){
   $response->json([
    "success" => false , 
    "message_error" => "Esse email não existe"
   ]);
  
  }

  $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
  $this->userModel->update($arrayUser[0]['id'], ['senha' =>  $senhaHash]);


  $response->json([
    "success" => true, 
    "message" => "Senha alterada"
    ]);
}

public function atualizarSenha(Request $request, Response $response)
{
    $data = $request->getBody();
    
  $validacao = $this->validarCampos($data, ['senha', 'confirm_senha',"id"]);

  if (!$validacao['success']) {
    return $response->json([
        'success' => false,
        'error' => $validacao['error']
    ], 400); // Código HTTP 400 - Bad Request
}

    $senha = $data['senha'];
    $confirmSenha = $data['confirm_senha'];

    if ($senha !== $confirmSenha) {
        return $response->json([
            'success' => false,
            'error' => 'As senhas não coincidem.'
        ], 400);
    }

    // Verifica se o usuário existe
    $usuario = $this->userModel->findById($data["id"]);
    if (!$usuario) {
        return $response->json([
            'success' => false,
            'error' => 'Usuário não encontrado.'
        ], 404);
    }

    // Atualiza a senha

   $mysql_data = $this->userModel->update((int) $data["id"], [
        'senha' => password_hash($data['senha'], PASSWORD_DEFAULT)
    ]); 
    return $response->json([
        "success" => true, 
        "message" => "Senha atualizada com sucesso",
        "dado" => $mysql_data 
    ]);

}

public function updateDados(Request $request, Response $response)
{
    $data = $request->getBody();
  
    $validacao = $this->validarCampos($data, [
        'user_id',
        'nome_completo',
        'email',
        'cpf',
        'telefone',
        'rua_avenida',
        'numero',
        'complemento',
        'bairro',
        'cidade',
    ]);

    if (!$validacao['success']) {
        return $response->json([
            'success' => false,
            'error' => $validacao['error']
        ], 400);
    }

    // Verifica se o usuário existe
    $usuario = $this->userModel->findById($data["user_id"]);
    if (!$usuario) {
        return $response->json([
            'success' => false,
            'error' => 'Usuário não encontrado.'
        ], 404);
    }

    // Atualiza tabela "users"
    $this->userModel->update($data['user_id'], [
        'nome' => $data['nome_completo'],
        'email' => $data['email']
    ]);

    // Atualiza ou cria os dados em "dados_users"
    $dadosUser = $this->dadosUserModel->findOneWhere('user_id = :user_id', ['user_id' => $data['user_id']]);

    $dadosParaAtualizar = [
        'cpf' => $data['cpf'],
        'telefone' => $data['telefone'],
        'rua_avenida' => $data['rua_avenida'],
        'numero' => $data['numero'],
        'complemento' => $data['complemento'],
        'bairro' => $data['bairro'],
        'cidade' => $data['cidade'],
    ];

    if ($dadosUser) {
        // Atualiza se já existe
        $this->dadosUserModel->update($dadosUser['id'], $dadosParaAtualizar);
    } else {
        // Cria se ainda não existe
        $dadosParaAtualizar['user_id'] = $data['user_id'];
        $this->dadosUserModel->create($dadosParaAtualizar);
    }

    return $response->json([
        'success' => true,
        'message' => 'Dados atualizados com sucesso.'
    ]);
     
}
}