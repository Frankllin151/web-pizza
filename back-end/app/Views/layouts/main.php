<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?? 'PHP MVC Framework' ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            padding-top: 20px;
            padding-bottom: 20px;
        }
        .container {
            max-width: 960px;
        }
        .header {
            padding-bottom: 20px;
            margin-bottom: 20px;
            border-bottom: 1px solid #e5e5e5;
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <span class="fs-4">PHP MVC Framework</span>
            </a>
            <ul class="nav nav-pills">
                <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="/users" class="nav-link">Usuários</a></li>
            </ul>
        </header>
        
        <main>
            <?php
            // Mensagens flash
            if (isset($_SESSION['flash_message'])) {
                echo '<div class="alert alert-' . ($_SESSION['flash_message_type'] ?? 'info') . '">' . $_SESSION['flash_message'] . '</div>';
                unset($_SESSION['flash_message']);
                unset($_SESSION['flash_message_type']);
            }
            ?>
            
            <?php echo $content ?? '' ?>
        </main>
        
        <footer class="pt-4 my-md-5 pt-md-5 border-top">
            <div class="row">
                <div class="col-12 col-md text-center">
                    <small class="d-block mb-3 text-muted">&copy; <?= date('Y') ?> PHP MVC Framework</small>
                </div>
            </div>
        </footer>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Para os formulários PUT e DELETE
        document.addEventListener('DOMContentLoaded', function() {
            const forms = document.querySelectorAll('form[data-method]');
            
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    const method = this.getAttribute('data-method').toUpperCase();
                    const action = this.getAttribute('action');
                    const formData = new FormData(this);
                    
                    fetch(action, {
                        method: method === 'GET' ? 'GET' : 'POST',
                        body: method === 'GET' ? null : formData,
                        headers: {
                            'X-HTTP-Method-Override': method
                        }
                    })
                    .then(response => {
                        if (response.redirected) {
                            window.location.href = response.url;
                        } else {
                            return response.text();
                        }
                    })
                    .then(html => {
                        if (html) {
                            document.open();
                            document.write(html);
                            document.close();
                        }
                    })
                    .catch(error => console.error('Erro:', error));
                });
            });
        });
    </script>
</body>
</html>