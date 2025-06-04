<?php 

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Core\Request;
use App\Core\Response;
use App\Models\Pizzas;
use App\Models\PizzaPreco;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use App\Models\User;
use App\Models\DadosUsers;
use App\Models\Pedido;
use App\Models\PedidoItens;

use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Exceptions\MPApiException;
use MercadoPago\Exceptions\MPException;

class PagamentoController extends BaseController
{
    protected User $userModel;
    protected DadosUsers $dadosUser;
    public function __construct()
    {
        $this->userModel = new User();
        $this->dadosUser = new DadosUsers();
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



public function DadoPayUser(Request $request , Response $response)
{
$data =  $request->getBody();

$validacao = $this->validarCampos($data, ["email"]);

if (!$validacao['success']) {
    return $response->json([
        'error' => $validacao['error']]);
    }

 $mysql = $this->userModel->findWhere('email = ?',[$data['email']]);
if(!$mysql)
{
    return $response->json([
        "success" => false, 
        "error" => "email não existem"
    ]);    
}

if (empty($mysql) || empty($mysql[0])) {
    return $response->json(['success' => false, 'error' => 'Usuário não encontrado'], 404);
}



$iduser = $mysql[0]["id"];
$sqlDadosUser = $this->dadosUser->findWhere("id = ?" , [$iduser]);

if (empty($sqlDadosUser) || empty($sqlDadosUser[0])) {
    return $response->json(['success' => false, 'error' => 'Dados do usuário não encontrados'], 404);
}

return $response->json([
    "nome" => $mysql[0]["nome"], 
    "telefone" => $sqlDadosUser[0]["telefone"],
    "cpf" => $sqlDadosUser[0]["cpf"], 
    "endereco" => $sqlDadosUser[0]["rua_avenida"], 
    "numero" => $sqlDadosUser[0]["numero"], 
    "complemento" => $sqlDadosUser[0]["complemento"], 
    "bairro" => $sqlDadosUser[0]["bairro"], 
    "cidade" => $sqlDadosUser[0]["cidade"],
    "nome_cartao" => $sqlDadosUser[0]["nome_cartao"], 
    "numero_cartao" => $sqlDadosUser[0]["numero_cartao"], 
    "validade_cartao" => $sqlDadosUser[0]["validade_cartao"],
    "cvv" => $sqlDadosUser[0]["cvv"]
]);
}




public function PayAll(Request $request , Response $response)
{
    $data = $request->getBody();
    $email = $data["cliente"]["email"];
    $nome = $data["cliente"]["nome"];
    $dataClient = $data["cliente"];
    // Chama o método que retorna o ID do usuário (existente ou criado)
    $usuarioId = $this->UsuarioCreate($email, $nome, $dataClient);

    if (!$usuarioId) {
        // Algo deu errado criando ou buscando usuário
        return $response->json([
            "flash" => "Erro ao processar usuário."
        ]);
    }


   $metodoPay = $data['pagamento']["metodo"];
   $valorTotal = $data["pagamento"]['total'];
   $cartao = $data["pagamento"]["cartao"]  ?? null;
  
  $itens  = $data["itens"];
   $itens = $this->lookpreco($itens); 
  $metodoPay = is_array($metodoPay) ? $metodoPay : [$metodoPay];

$dados = [];
    foreach($metodoPay as $metodo){
        $dados = $this->montarDadosPagamento($metodo,  
        $itens, 
        $valorTotal 
        , $usuarioId, $cartao );

    }
  
 
    // Aqui você pode continuar o processamento do pagamento,
    // usando $usuarioId se precisar
    date_default_timezone_set('America/Sao_Paulo');
    $pedidoModel = new Pedido();
    $pedidoItemModel = new PedidoItens();

    $pedido = [
    'cliente' => $usuarioId[0]["nome"],
    'user_id' => $usuarioId[0]["id"],
    'status' => $dados["status"] ?? null ,
    'data' => date("Y-m-d H:i:s"), // agora está no horário de Brasília
    'total' => $valorTotal,
    'id_pagamento' => $dados["id_pagamento"]  ?? null,
    'metodo_pagamento' => $metodoPay[0],
    'itens' => []
];
if($pedido["status"] === "rejected" || $pedido["status"] === ""  || $pedido["status"] === null  ){
    return $response->json([
         "dados" => $dados, 
        "usuario_id" => $usuarioId
    ]);
   
}


// Salva pedido e pega o ID do pedido criado
    $pedidoId = $pedidoModel->create($pedido);

foreach ($itens as $item) {
     $pedidoItemModel->create([
            'pedido_id' => $pedidoId,
            'pizza_id' => $item['id'],
            'quantidade' => $item['quantidade'],
            'tamanho' => $item['tamanho']
        ]);
}
   $pedido['id'] = $pedidoId;
    $pedido['itens'] = $itens;

    return $response->json([
         "dados" => $dados, 
         "deu-certo" => "ok",
        "usuario_id" => $usuarioId
    ]);
}
private function lookpreco($itens)
{
    
    $pizzaPreco = new PizzaPreco();
    foreach ($itens as &$item) {
    $preco = $pizzaPreco->findOneWhere(
        'pizza_id = :pizza_id AND tamanho = :tamanho',
        [
            'pizza_id' => $item['id'],
            'tamanho' => $item['tamanho']
        ]
    );

   $item['preco'] = isset($preco['preco']) ? round((float) $preco['preco'], 2) : 0.00;

}
 unset($item);
return  $itens;
}
private function montarDadosPagamento($metodo, $itens, $valorTotal, $usuarioId, $cartao)
{
    switch($metodo) {
        case "pix":
            return $this->montarPagamentoPix($itens,$valorTotal, $usuarioId);
        case "dinheiro":
            return $this->montarPagamentoDinheiro($itens, $valorTotal);
        case "cartao":
            return $this->montarPagamentoCartao($itens,$valorTotal, $cartao);
        default: 
            throw new \Exception("Método de pagamento inválido: {$metodo}");
    }
}


private function montarPagamentoPix(array $itens, string $valorTotal, array  $usuarioId): array
{
       MercadoPagoConfig::setAccessToken($_ENV["MERCADO_TOKEN_PAY"]);
       MercadoPagoConfig::setRuntimeEnviroment(MercadoPagoConfig::LOCAL);
$client = new PaymentClient();

$request = [
    "transaction_amount" => (float) $valorTotal,
    "description" => "Web pizza- Pedido  via pix",
    "payment_method_id" => "pix",
    "payer" => [
        "email" => $usuarioId[0]['email'],
        "first_name" => $usuarioId[0]['nome'],
    ],
];

try {
    $payment = $client->create($request);

    return [
        'status' => $payment->status,
        'id_pagamento' => $payment->id,
        'codigo_pix' => $payment->point_of_interaction->transaction_data->qr_code,
        'qr_code_base64' => $payment->point_of_interaction->transaction_data->qr_code_base64,
    ];
} catch (MPApiException $e) {
    return [
        'erro' => true,
        'mensagem' => $e->getApiResponse()->getContent(),
    ];
}
}

private function montarPagamentoDinheiro(array $itens , string $valorTotal): array
{
    return [
       "status" => "pending",
            "id_pagamento" => null,
            "detalhes" => "Dinheiro"
    ];
}

private function montarPagamentoCartao(array $itens, string $valorTotal, array  $cartao): array
{
   // Configure sua Public e Access Token
    MercadoPagoConfig::setAccessToken($_ENV["MERCADO_TOKEN_PAY"]);

    $data = $cartao;

    try {
        $client = new PaymentClient();

        $payment = $client->create([
            "transaction_amount" => round((float) $data["transaction_amount"], 2),
            "token" => $data["token"],
            "description" => $data["description"],
            "installments" => (int)$data["installments"],
            "payment_method_id" => $data["payment_method_id"],
            "payer" => [
                "email" => $data["payer"]["email"],
                "identification" => [
                    "type" => $data["payer"]["identification"]["type"],
                    "number" => $data["payer"]["identification"]["number"]
                ]
            ]
        ]);

        return [
            "status" => $payment->status,
            "id_pagamento" => $payment->id,
            "detalhes" => $payment
        ];
    } catch (MPApiException $e) {
        return [
            "erro" => "Erro na API do Mercado Pago",
            "mensagem" => $e->getApiResponse()->getContent()
        ];
    } 
}


private function UsuarioCreate($email, $nome, $dataClient)
{
    // Verifica se usuário existe
    $usuarioExistente = $this->userModel->findUser($email);

    if ($usuarioExistente) {
        // Retorna ID do usuário já existente
        return $usuarioExistente;
    } else {
        // Cria novo usuário
        $novoUsuarioId = $this->userModel->create([
            "nome" => $nome,
            "email" => $email,
            "senha" => password_hash($email, PASSWORD_DEFAULT),
        ]);
         

        if ($novoUsuarioId <= 0) {
            // Retorna falso em caso de erro
            return false;
        }

    $this->dadosUser->create([
        'user_id' => $novoUsuarioId,
                 'cpf' => $dataClient['cpf'] ?? null,
                 'telefone' => $dataClient['telefone'] ?? null,
                 'rua_avenida' => $dataClient['endereco'] ?? null,
                 'numero' => $dataClient['numero'] ?? null,
                 'complemento' => $dataClient['complemento'] ?? null,
                 'bairro' => $dataClient['bairro'] ?? null,
                 'cidade' => $dataClient['cidade'] ?? null,
                 'created_at' => date('Y-m-d H:i:s'),
                 'updated_at' => date('Y-m-d H:i:s')
    ]);
    $mail = new PHPMailer(true);
 $mail->CharSet = 'UTF-8'; // Define a codificação como UTF-8
$mail->Encoding = 'base64';

$mail->isSMTP();
  $mail->Host = $_ENV["HOST_SMTP"]; // ou smtp.gmail.com, etc.
  $mail->SMTPAuth = true;
  $mail->Username = $_ENV["USER_NAME_SMTP"];
  $mail->Password = $_ENV['PASSWORD_SMTP'];
  $mail->Port = $_ENV["PORT_SMTP"];

  $mail->setFrom($_ENV["EMAIL_SMTP"] , "Web-pizza");
  $mail->addAddress($email);

  $mail->isHTML(true); // ⚠️ ATIVAR HTML
  $mail->Subject = 'Bem Vindo à Web-Pizza';
  function renderTemplate($templatePath, $data = []){
extract($data); // cria variáveis com base nas chaves
    ob_start();
    include $templatePath;
    return ob_get_clean();
  }
  $mail->Body = renderTemplate(APP_ROOT . "/app/Views/email/welcome.php",[
    'nome' => $nome , 
    'email' => $email , 
    'senha' => $email
  ]);
  
  $mail->AltBody = 'Este é o conteúdo alternativo para e-mail que não suportam HTML.';

  $mail->send();
    
        return $novoUsuarioId;
    }
}



public function checkStatusPay(Request $request, Response $response)
{
 // Inicializa SDK do Mercado Pago
 MercadoPagoConfig::setAccessToken($_ENV["MERCADO_TOKEN_PAY"]);
 $pedidoModel = new Pedido();

    // Busca todos os pedidos pendentes ou que não estão "approved"
    $pedidos = $pedidoModel->findWhere("status != :status AND id_pagamento IS NOT NULL", [
        ":status" => "approved"
    ]);

    $client = new PaymentClient();
    $atualizados = [];

    foreach ($pedidos as $pedido) {
        try {
            $payment = $client->get($pedido['id_pagamento']);

            if ($payment && $payment->status !== $pedido['status']) {
                $pedidoModel->update($pedido['id'], [
                    'status' => $payment->status
                ]);

                $atualizados[] = [
                    'pedido_id' => $pedido['id'],
                    'id_pagamento' => $pedido['id_pagamento'],
                    'status_antigo' => $pedido['status'],
                    'novo_status' => $payment->status
                ];
            }
        } catch (MPApiException $e) {
            // Você pode logar o erro se quiser
            continue;
        }
    }

    return $response->json([
        'mensagem' => count($atualizados) . ' pedidos atualizados.',
        'atualizados' => $atualizados
    ]);
}

public function cartaoPay(Request $request, Response $response)
{
     
}
}