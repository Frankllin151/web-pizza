<div class="container">
    <h1 class="mb-4">Editar Usuário</h1>
    
    <form action="/users/<?= $user['id'] ?>" method="POST" data-method="PUT">
        <div class="mb-3">
            <label for="name" class="form-label">Nome</label>
            <input type="text" class="form-control" id="name" name="name" value="<?= htmlspecialchars($user['name']) ?>" required>
        </div>
        
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" name="email" value="<?= htmlspecialchars($user['email']) ?>" required>
        </div>
        
        <div class="mb-3">
            <label for="password" class="form-label">Nova Senha (deixe em branco para manter a atual)</label>
            <input type="password" class="form-control" id="password" name="password">
        </div>
        
        <div class="mb-3">
            <label for="password_confirmation" class="form-label">Confirmar Nova Senha</label>
            <input type="password" class="form-control" id="password_confirmation" name="password_confirmation">
        </div>
        
        <div class="d-flex justify-content-between">
            <a href="/users" class="btn btn-secondary">Voltar</a>
            <button type="submit" class="btn btn-primary">Atualizar</button>
        </div>
    </form>
</div>
