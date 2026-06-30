/* ==========================================================================
   PORTFÓLIO - THIAGO ROSA DE LIMA
   Arquivo: script.js
   Descrição: Todo o JavaScript do site (vanilla JS, sem jQuery ou
   frameworks). Cada bloco abaixo é independente e comentado.
   ========================================================================== */

/* Espera o HTML inteiro carregar antes de manipular os elementos da página */
document.addEventListener("DOMContentLoaded", function () {
  inicializarTema();
  inicializarMenuMobile();
  destacarLinkAtivo();
  inicializarFormularioContato(); // só faz algo se existir um form na página
});

/* --------------------------------------------------------------------------
   1. TEMA CLARO / ESCURO
   Guarda a preferência do usuário no localStorage para que o tema escolhido
   continue o mesmo ao navegar entre as páginas e ao voltar no site depois.
   -------------------------------------------------------------------------- */
function inicializarTema() {
  const botaoTema = document.getElementById("botao-tema");
  if (!botaoTema) return;

  const temaSalvo = localStorage.getItem("portfolio-tema");

  // Aplica o tema salvo (ou o tema claro, que é o padrão do site)
  if (temaSalvo === "escuro") {
    document.body.classList.add("tema-escuro");
    botaoTema.textContent = "☀️";
  } else {
    botaoTema.textContent = "🌙";
  }

  botaoTema.addEventListener("click", function () {
    // Alterna a classe "tema-escuro" no <body>; todo o resto do visual
    // muda sozinho porque o CSS usa variáveis (custom properties) de cor.
    const escuroAtivo = document.body.classList.toggle("tema-escuro");
    botaoTema.textContent = escuroAtivo ? "☀️" : "🌙";
    localStorage.setItem("portfolio-tema", escuroAtivo ? "escuro" : "claro");
  });
}

/* --------------------------------------------------------------------------
   2. MENU RESPONSIVO (hambúrguer) PARA DISPOSITIVOS MÓVEIS
   Em telas pequenas o menu fica escondido (ver media query no CSS) e este
   botão mostra/esconde o menu.
   -------------------------------------------------------------------------- */
function inicializarMenuMobile() {
  const botaoMenu = document.getElementById("botao-menu-mobile");
  const menu = document.getElementById("menu-principal");
  if (!botaoMenu || !menu) return;

  botaoMenu.addEventListener("click", function () {
    botaoMenu.classList.toggle("aberto");
    menu.classList.toggle("aberto");
  });

  // Fecha o menu automaticamente quando o usuário clica em um link
  // (evita que o menu fique aberto depois de navegar para outra página/seção)
  const links = menu.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      botaoMenu.classList.remove("aberto");
      menu.classList.remove("aberto");
    });
  });
}

/* --------------------------------------------------------------------------
   3. DESTACAR O LINK DA PÁGINA ATUAL NO MENU
   Compara o nome do arquivo atual (ex: "formacao.html") com o atributo
   href de cada link do menu e adiciona a classe "ativo" quando bate.
   -------------------------------------------------------------------------- */
function destacarLinkAtivo() {
  const linksMenu = document.querySelectorAll("#menu-principal a");
  let paginaAtual = window.location.pathname.split("/").pop();
  if (paginaAtual === "") paginaAtual = "index.html"; // raiz do site

  linksMenu.forEach(function (link) {
    const destino = link.getAttribute("href");
    if (destino === paginaAtual) {
      link.classList.add("ativo");
    }
  });
}

/* --------------------------------------------------------------------------
   4. VALIDAÇÃO E ENVIO (SIMULADO) DO FORMULÁRIO DE CONTATO
   -------------------------------------------------------------------------- */
function inicializarFormularioContato() {
  const formulario = document.getElementById("form-contato");
  if (!formulario) return; // só executa na página de contato

  const campoNome = document.getElementById("campo-nome");
  const campoEmail = document.getElementById("campo-email");
  const campoMensagem = document.getElementById("campo-mensagem");

  // Expressão regular simples para validar o formato "algo@algo.algo"
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // impede o recarregamento da página

    let formularioValido = true;

    // --- Validação do campo Nome ---
    if (campoNome.value.trim() === "") {
      mostrarErro(campoNome, "Por favor, informe seu nome.");
      formularioValido = false;
    } else {
      limparErro(campoNome);
    }

    // --- Validação do campo E-mail ---
    if (campoEmail.value.trim() === "") {
      mostrarErro(campoEmail, "Por favor, informe seu e-mail.");
      formularioValido = false;
    } else if (!regexEmail.test(campoEmail.value.trim())) {
      mostrarErro(campoEmail, "Informe um e-mail em um formato válido (ex: usuario@dominio.com).");
      formularioValido = false;
    } else {
      limparErro(campoEmail);
    }

    // --- Validação do campo Mensagem ---
    if (campoMensagem.value.trim() === "") {
      mostrarErro(campoMensagem, "Escreva uma mensagem antes de enviar.");
      formularioValido = false;
    } else {
      limparErro(campoMensagem);
    }

    if (!formularioValido) {
      return; // interrompe aqui se algum campo estiver inválido
    }

    // Em um site real, aqui entraria uma chamada a um serviço de envio de
    // e-mail (ex: EmailJS, Formspree, backend próprio). Como a atividade
    // pede apenas a SIMULAÇÃO do envio, mostramos uma mensagem de sucesso
    // e limpamos o formulário.
    abrirModalSucesso();
    formulario.reset();
  });

  function mostrarErro(campo, mensagem) {
    const container = campo.closest(".campo-formulario");
    container.classList.add("campo-invalido");
    const elementoErro = container.querySelector(".mensagem-erro");
    elementoErro.textContent = mensagem;
  }

  function limparErro(campo) {
    const container = campo.closest(".campo-formulario");
    container.classList.remove("campo-invalido");
    const elementoErro = container.querySelector(".mensagem-erro");
    elementoErro.textContent = "";
  }
}

/* --------------------------------------------------------------------------
   5. MODAL DE CONFIRMAÇÃO DE ENVIO
   -------------------------------------------------------------------------- */
function abrirModalSucesso() {
  const modal = document.getElementById("modal-sucesso");
  if (!modal) return;
  modal.classList.add("visivel");

  // Fecha automaticamente depois de alguns segundos
  setTimeout(fecharModalSucesso, 4000);
}

function fecharModalSucesso() {
  const modal = document.getElementById("modal-sucesso");
  if (!modal) return;
  modal.classList.remove("visivel");
}
