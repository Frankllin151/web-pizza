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

class ProdutoPizzaController extends BaseController
{

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

}