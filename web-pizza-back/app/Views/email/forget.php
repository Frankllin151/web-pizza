<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinição de Senha</title>
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
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="/api/placeholder/150/60" alt="Logo da Empresa">
            <h1>Redefinição de Senha</h1>
        </div>
        <div class="content">
            <h1>Web-pizza: Esqueceu a senha?</h1>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta. Se você não solicitou essa alteração, pode ignorar este email com segurança.</p>
            
            <p>Para redefinir sua senha, clique no botão abaixo:</p>
            
            <div style="text-align: center;">
                <a href="http://localhost:3000/update-senha?token=<?php $codigo; ?>" class="button">Redefinir Minha Senha</a>
            </div>
            
            <div class="info">
                <p><strong>Observação:</strong> Este link é válido por apenas 24 horas. Após esse período, você precisará solicitar uma nova redefinição de senha.</p>
            </div>
            
            <div class="divider"></div>
            
            <p>Se o botão acima não funcionar, copie e cole o link abaixo no seu navegador:</p>
            <p style="word-break: break-all; color: #F97316;">[LINK_REDEFINIÇÃO]</p>
            
            <p>Por razões de segurança, recomendamos que você crie uma senha forte que:</p>
            <ul>
                <li>Contenha pelo menos 8 caracteres</li>
                <li>Inclua letras maiúsculas e minúsculas</li>
                <li>Contenha números e símbolos</li>
                <li>Não tenha sido usada anteriormente</li>
            </ul>
            
            <p>Se você não solicitou essa redefinição ou precisa de ajuda, entre em contato com nossa equipe de suporte.</p>
            
            <p>Atenciosamente,<br>Equipe Web-pizza</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Web-pizza. Todos os direitos reservados.</p>
            <p>Este é um email automático, por favor não responda.</p>
            <p>[Endereço da Empresa] | [Telefone] | [Email de Contato]</p>
        </div>
    </div>
</body>
</html>