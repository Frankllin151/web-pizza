<div class="container">
    <h1 class="mb-4">Detalhes do Usuário</h1>
    
    <div class="card">
        <div class="card-body">
            <h5 class="card-title"><?= htmlspecialchars($user['name']) ?></h5>
            <p class="card-text"><strong>Email:</strong> <?= htmlspecialchars($user['email']) ?></p>
            <p class="card-text"><strong>Data de Criação:</strong> <?= date('d/m/Y H:i', strtotime($user['created_at'])) ?></p>
            <p class="card-text"><strong>Última Atualização:</strong> <?= date('d/m/Y H:i', strtotime($user['updated_at'])) ?></p>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <a href="/users" class="btn btn-secondary">Voltar</a>
            <div>
                <a href="/users/<?= $user['id'] ?>/edit" class="btn btn-warning">Editar</a>
                <form action="/users/<?= $user['id'] ?>" method="POST" data-method="DELETE" class="d-inline">
                    <button type="submit" class="btn btn-danger" onclick="return confirm('Tem certeza que deseja excluir este usuário?')">Excluir</button>
                </form>
            </div>
        </div>
    </div>
</div>