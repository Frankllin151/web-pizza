<div class="container">
    <h1 class="mb-4">Lista de Usuários</h1>
    
    <div class="d-flex justify-content-end mb-3">
        <a href="/users/create" class="btn btn-primary">Novo Usuário</a>
    </div>
    
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Criado em</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($users)): ?>
                    <tr>
                        <td colspan="5" class="text-center">Nenhum usuário encontrado</td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($users as $user): ?>
                        <tr>
                            <td><?= $user['id'] ?></td>
                            <td><?= htmlspecialchars($user['name']) ?></td>
                            <td><?= htmlspecialchars($user['email']) ?></td>
                            <td><?= date('d/m/Y H:i', strtotime($user['created_at'])) ?></td>
                            <td>
                                <div class="btn-group" role="group">
                                    <a href="/users/<?= $user['id'] ?>" class="btn btn-sm btn-info">Ver</a>
                                    <a href="/users/<?= $user['id'] ?>/edit" class="btn btn-sm btn-warning">Editar</a>
                                    <form action="/users/<?= $user['id'] ?>" method="POST" data-method="DELETE" class="d-inline">
                                        <button type="submit" class="btn btn-sm btn-danger" onclick="return confirm('Tem certeza que deseja excluir este usuário?')">Excluir</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>