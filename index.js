// 1. SELEÇÃO DOS ELEMENTOS DO DOM
const form = document.getElementById('form-login');
const emailInput = document.getElementById('email');

const senhaInput = document.getElementById('senha');
const erroEmail = document.getElementById('erro-email');

const erroSenha = document.getElementById('erro-senha');
const btnOlho = document.getElementById('btn-olho');

const btnSubmit = document.getElementById('btn-submit');
const alertaSucesso = document.getElementById('alerta-sucesso');

// 2. FUNÇÃO AUXILIAR: VALIDAÇÃO DE EMAIL COM REGEX
function emailEhValido(email) {
    const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return padrao.test(email);
}

// 3. FUNÇÕES AUXILIARES DE ERRO (Inline)
function mostrarErro(input, elementoErro, mensagem) {
    input.classList.add('input-erro');
    elementoErro.textContent = mensagem;
}

function limparErro(input, elementoErro) {
    input.classList.remove('input-erro');
    elementoErro.textContent = '';
}

// 4. MOSTRAR / OCULTAR SENHA ("Olhinho")
btnOlho.addEventListener('click', function() {
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        btnOlho.textContent = '🙈';
    } else {
        senhaInput.type = 'password';
        btnOlho.textContent = '👁️';
    }
});

// 5. LIMPAR ERROS ENQUANTO O USUÁRIO DIGITA (Tempo Real)
emailInput.addEventListener('input', function() {
    limparErro(emailInput, erroEmail);
    if (alertaSucesso) alertaSucesso.style.display = 'none';
});

senhaInput.addEventListener('input', function() {
    limparErro(senhaInput, erroSenha);
    if (alertaSucesso) alertaSucesso.style.display = 'none';
});

// 6. EVENTO DE SUBMISSÃO DO FORMULÁRIO COM VALIDAÇÃO E LOADING
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpa avisos anteriores
    limparErro(emailInput, erroEmail);
    limparErro(senhaInput, erroSenha);
    if (alertaSucesso) alertaSucesso.style.display = 'none';

    const emailValor = emailInput.value.trim();
    const senhaValor = senhaInput.value;
    let formularioValido = true;

    // Validação do E-mail
    if (emailValor === '') {
        mostrarErro(emailInput, erroEmail, 'Por favor, digite seu e-mail.');
        formularioValido = false;
    } else if (!emailEhValido(emailValor)) {
        mostrarErro(emailInput, erroEmail, 'Digite um formato de e-mail válido.');
        formularioValido = false;
    }

    // Validação da Senha
    if (senhaValor === '') {
        mostrarErro(senhaInput, erroSenha, 'Por favor, digite sua senha.');
        formularioValido = false;
    } else if (senhaValor.length < 6) {
        mostrarErro(senhaInput, erroSenha, 'A senha deve ter no mínimo 6 caracteres.');
        formularioValido = false;
    }

    // Se houver algum erro, não envia o formulário
    if (!formularioValido) {
        return;
    }

    // FEEDBACK VISUAL: Estado de "Carregando..."
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Entrando...';

    // Simulação de requisição com delay de 1.5s
    setTimeout(function() {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Enviar';

        // Exibe mensagem de sucesso visual
        if (alertaSucesso) {
            alertaSucesso.style.display = 'block';
        }

        // Limpa formulário
        form.reset();

        // Garante que o campo de senha volte ao estado protegido
        senhaInput.type = 'password';
        btnOlho.textContent = '👁️';
    }, 1500);
});
