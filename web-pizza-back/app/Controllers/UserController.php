<?php

namespace App\Controllers;

use App\Models\User;
use App\Core\Request;
use App\Core\Response;

class UserController extends BaseController
{
    private User $userModel;
    
    public function __construct()
    {
        $this->userModel = new User();
    }
    
    /**
     * Exibe a lista de usuários
     */
    public function index(Request $request, Response $response): void
    {
        $users = $this->userModel->findAll();
        $this->render('users/index', ['users' => $users]);
    }
    
    /**
     * Exibe o formulário para criar um novo usuário
     */
    public function create(Request $request, Response $response): void
    {
        $this->render('users/create');
    }
    
    /**
     * Armazena um novo usuário
     */
    public function store(Request $request, Response $response): void
    {
        $data = $request->getBody();
        
        // Validação simples
        if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
            // Redirecionar de volta com erro
            $this->redirect('/users/create');
            return;
        }
        
        // Hash da senha
        $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        
        // Salvar usuário
        $userId = $this->userModel->create($data);
        
        if ($userId) {
            $this->redirect('/users');
        } else {
            $this->redirect('/users/create');
        }
    }
    
    /**
     * Exibe um usuário específico
     */
    public function show(Request $request, Response $response): void
    {
        $id = $request->getParam('id');
        $user = $this->userModel->findById($id);
        
        if (!$user) {
            $response->setStatusCode(404);
            echo "Usuário não encontrado";
            return;
        }
        
        $this->render('users/show', ['user' => $user]);
    }
    
    /**
     * Exibe o formulário para editar um usuário
     */
    public function edit(Request $request, Response $response): void
    {
        $id = $request->getParam('id');
        $user = $this->userModel->findById($id);
        
        if (!$user) {
            $response->setStatusCode(404);
            echo "Usuário não encontrado";
            return;
        }
        
        $this->render('users/edit', ['user' => $user]);
    }
    
    /**
     * Atualiza um usuário específico
     */
    public function update(Request $request, Response $response): void
    {
        $id = $request->getParam('id');
        $data = $request->getBody();
        
        // Validação simples
        if (empty($data['name']) || empty($data['email'])) {
            $this->redirect("/users/edit/$id");
            return;
        }
        
        // Se uma nova senha for fornecida, faz hash dela
        if (!empty($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
        } else {
            // Se não for fornecida, remova do array para não atualizar
            unset($data['password']);
        }
        
        $success = $this->userModel->update($id, $data);
        
        if ($success) {
            $this->redirect('/users');
        } else {
            $this->redirect("/users/edit/$id");
        }
    }
    
    /**
     * Remove um usuário específico
     */
    public function destroy(Request $request, Response $response): void
    {
        $id = $request->getParam('id');
        $this->userModel->delete($id);
        $this->redirect('/users');
    }
}