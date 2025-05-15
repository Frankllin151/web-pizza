
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-Vindo à Web Pizza</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #F4F4F5;
            margin: 0;
            padding: 0;
            color: #1A1A1D;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #F97316;
            padding: 30px;
            text-align: center;
            color: white;
        }
        .header img {
            max-width: 150px;
            margin-bottom: 15px;
        }
        .content {
            padding: 30px;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            background-color: #F97316;
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 12px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #ea580c;
        }
        .footer {
            background-color: #F4F4F5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #1A1A1D;
            border-top: 1px solid #e5e5e5;
        }
        .divider {
            height: 1px;
            background-color: #e5e5e5;
            margin: 20px 0;
        }
        .info {
            background-color: #F4F4F5;
            padding: 15px;
            border-radius: 12px;
            margin: 20px 0;
        }
        .credentials {
            background-color: #F4F4F5;
            padding: 15px;
            border-radius: 12px;
            margin: 20px 0;
            border-left: 4px solid #F97316;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="/api/placeholder/150/60" alt="Logo Web Pizza">
            <h1>Bem-Vindo à Web Pizza!</h1>
        </div>
        <div class="content">
            <h1>Olá, <?= htmlspecialchars($nome) ?>!</h1>
            <p>É com grande prazer que damos as boas-vindas a você na <strong>Web Pizza</strong>! Estamos muito felizes em tê-lo(a) como nosso novo cliente.</p>
            
            <p>Seu cadastro foi realizado com sucesso e agora você já pode acessar nosso site e começar a aproveitar todas as vantagens!</p>
            
            <div class="credentials">
                <h3>Suas Informações de Acesso:</h3>
                <p>Seu e-mail: <?= htmlspecialchars($email) ?></p>
                <p>Sua senha: <?= htmlspecialchars($senha) ?></p>
            </div>
            
            <p>Com sua conta, você poderá:</p>
            <ul>
                <li>Fazer pedidos de forma rápida e prática</li>
                <li>Acompanhar o status das suas entregas em tempo real</li>
                <li>Acessar promoções exclusivas para clientes cadastrados</li>
                <li>Salvar seus endereços e formas de pagamento favoritos</li>
            </ul>
            
            <div style="text-align: center;">
                <a href="localhost:3000" class="button">Acessar Minha Conta</a>
            </div>
            
            <div class="info">
                <p><strong>Dica:</strong> Recomendamos que você altere sua senha temporária na primeira vez que acessar sua conta.</p>
            </div>
            
            <div class="divider"></div>
            
            <p>Se você tiver qualquer dúvida ou precisar de ajuda, nossa equipe de suporte está sempre disponível para ajudá-lo(a). Basta entrar em contato pelo nosso site ou pelo telefone de atendimento.</p>
            
            <p>Estamos ansiosos para preparar deliciosas pizzas para você!</p>
            
            <p>Atenciosamente,<br>Equipe Web Pizza</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Web Pizza. Todos os direitos reservados.</p>
            <p>Este é um email automático, por favor não responda.</p>
            <p>Av. das Pizzas, 123 - Centro | (11) 4321-1234 | contato@webpizza.com</p>
        </div>
    </div>
</body>
</html>