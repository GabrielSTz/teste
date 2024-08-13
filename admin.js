document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;

    // Verificação simples de senha
    if (password === '123') {
        window.location.href = 'admin_dashboard.html'; // Redireciona para o painel de administração
    } else {
        alert('Senha incorreta!');
    }
});