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
class ProdutoPizzaController extends BaseController
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

   
  
    public function adicionaPizza(Request $request, Response $response)
    {
   
    $data = $request->getBody();

    $validacao = $this->validarCampos($data, ['nome', 'imagem', 'descricao', 'tamanhos']);
    
    if (!$validacao['success']) {
        return $response->json([
            'error' => $validacao['error']]);}

    
   $pizzaModel = new Pizzas();
   $pizzaPrecoModel = new PizzaPreco();
   
   $pizzaId = $pizzaModel->create([
    'nome' => $data['nome'],
    'imagem' => $data['imagem'],
    'descricao' => $data['descricao']]);
    
    $tamanhosValidos = ['p', 'm', 'g', 'gg'];

    foreach ($tamanhosValidos as $tamanho) {
    if (isset($data['tamanhos'][$tamanho])) {
        $preco = $data['tamanhos'][$tamanho];

        // Garante que seja um número
        if (is_numeric($preco)) {
            $pizzaPrecoModel->create([
                'pizza_id' => $pizzaId,
                'tamanho' => $tamanho,
                'preco' => $preco
            ]);}
        }
    }
    return $response->json([
        "success" => true, 
        "message" => "Pizza criada com sucesso", 
        "pizza_id" => $pizzaId
    ]); 
}


public function editarPizza(Request $request, Response $response)
{
    $data = $request->getBody();
    $validacao = $this->validarCampos($data, ['id','nome', 'imagem', 'descricao', 'tamanhos']);
    
    if (!$validacao['success']) {
        return $response->json([
            'error' => $validacao['error']]);
        }

    $pizzaModel = new Pizzas();
    $pizzaPrecoModel = new PizzaPreco();

    $atualizado = $pizzaModel->update((int) $data['id'], [
        'nome' => $data['nome'],
        'descricao' => $data['descricao'],
        'imagem' => $data['imagem']
    ]);

     // Apaga os preços antigos
     $pizzaPrecoModel->deleteWhere('pizza_id = :id', ['id' => $data['id']]);

     $tamanhosValidos = ['p', 'm', 'g', 'gg'];
     foreach ($tamanhosValidos as $tamanho) {
         if (isset($data['tamanhos'][$tamanho]) && is_numeric($data['tamanhos'][$tamanho])) {
             $pizzaPrecoModel->create([
                 'pizza_id' => $data['id'],
                 'tamanho' => $tamanho,
                 'preco' => $data['tamanhos'][$tamanho]
             ]);
         }
     }

     return $response->json([
        'success' => true,
        'message' => 'Pizza atualizada com sucesso.',
        'atualizado' => $atualizado
    ]);
}


public function deletarPizza(Request $request, Response $response)
{
    $data = $request->getBody();
    $validacao = $this->validarCampos($data, ['id']);
    
    if (!$validacao['success']) {
        return $response->json([
            'error' => $validacao['error']]);
        }

    $pizzaId = (int)$data['id'];

    $pizzaModel = new Pizzas();
    $precoModel = new PizzaPreco();

    // Deleta os preços primeiro
    $precoModel->deleteWhere('pizza_id = :id', ['id' => $pizzaId]);

    // Depois deleta a pizza
    $sucesso = $pizzaModel->delete($pizzaId);

    if ($sucesso) {
        return $response->json(['success' => 'Pizza e preços deletados com sucesso.']);
    }

    return $response->json(['error' => 'Erro ao deletar pizza.'], 500);
}

public function selectAll(Request $request ,Response $response)
{
    $pizzasModel = new Pizzas();
    $precosModel = new PizzaPreco();

    $pizzas = $pizzasModel->findAll();
    $precos = $precosModel->findAll();

    // Agrupar os preços por pizza_id
    $precosAgrupados = [];
    foreach ($precos as $preco) {
        $pizzaId = $preco['pizza_id'];
        $tamanho = strtolower($preco['tamanho']);
        $valor = (float)$preco['preco'];

        if (!isset($precosAgrupados[$pizzaId])) {
            $precosAgrupados[$pizzaId] = [];
        }

        $precosAgrupados[$pizzaId][$tamanho] = $valor;
    }

    // Montar resultado final
    $resultado = [];
    foreach ($pizzas as $pizza) {
        $resultado[] = [
            'id' => (int)$pizza['id'],
            'nome' => $pizza['nome'],
            'tamanhos' => $precosAgrupados[$pizza['id']] ?? [],
            'imagem' => $pizza['imagem'],
            'descricao' => $pizza['descricao'],
        ];
    }
    return $response->json($resultado);   
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
   $itens  = $data["itens"];
   $itens = $this->lookpreco($itens);
  $metodoPay = is_array($metodoPay) ? $metodoPay : [$metodoPay];

$dados = [];
    foreach($metodoPay as $metodo){
        $dados = $this->montarDadosPagamento($metodo,  $itens, $valorTotal , $usuarioId);

    }
    // Aqui você pode continuar o processamento do pagamento,
    // usando $usuarioId se precisar
    date_default_timezone_set('America/Sao_Paulo');
    $pedidoModel = new Pedido();
    $pedidoItemModel = new PedidoItens();

    $pedido = [
    'cliente' => $usuarioId[0]["nome"],
    'user_id' => $usuarioId[0]["id"],
    'status' => $dados["status"],
    'data' => date("Y-m-d H:i:s"), // agora está no horário de Brasília
    'total' => $valorTotal,
    'id_pagamento' => $dados["id_pagamento"],
    'metodo_pagamento' => $metodoPay[0],
    'itens' => []
];
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
        "pedido" => $pedido, 
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
private function montarDadosPagamento($metodo, $itens, $valorTotal, $usuarioId)
{
    switch($metodo) {
        case "pix":
            return $this->montarPagamentoPix($itens,$valorTotal, $usuarioId);
        case "dinheiro":
            return $this->montarPagamentoDinheiro($itens, $valorTotal);
        case "cartao":
            return $this->montarPagamentoCartao($itens,$valorTotal);
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
        'tipo' => 'dinheiro',
        'valor' => $valorTotal ,
        'itens' => $itens
    ];
}

private function montarPagamentoCartao(array $itens, string $valorTotal): array
{
    return [
        'tipo' => 'cartao',
        'bandeira' => 'Visa',
        'parcelas' =>1,
        'valor' => $valorTotal,
        'itens' => $itens
    ];
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
   
    return $response->json([
        'id_pagamento' =>"todo",
        ]);
}
}