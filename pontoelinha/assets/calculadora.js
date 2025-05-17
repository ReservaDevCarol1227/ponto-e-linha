const form = document.getElementById('form-proj');
const resultadoDiv = document.getElementById('resultado');
const salvarBtn = document.getElementById('abrir-salvar');
const popupSalvar = document.getElementById('popup-salvar');
const popupLogin = document.getElementById('popup-login');
const formSalvar = document.getElementById('popup-form');
const formLogin = document.getElementById('login-form');
const formCadastro = document.getElementById('cadastro-form');
const inputImagem = document.getElementById('popup-imagem');
const previewImg = document.getElementById('preview-img');
const previewContainer = document.getElementById('preview-container');

const agulhas = {
  "3.0": { co: 2, pbx: 2, pb: 4, pma: 5.5, pa: 7.5, pda: 10.5 },
  "3.5": { co: 2.5, pbx: 2.5, pb: 4.5, pma: 6, pa: 8, pda: 11 },
  "4.0": { co: 3, pbx: 3, pb: 5, pma: 6.5, pa: 8.5, pda: 11.5 },
  "4.5": { co: 3.5, pbx: 3.5, pb: 5.5, pma: 7, pa: 9, pda: 12 },
  "5.0": { co: 8, pbx: 8, pb: 10, pma: 11.5, pa: 13.5, pda: 16.5 },
  "5.5": { co: 8.5, pbx: 8.5, pb: 10.5, pma: 12, pa: 14, pda: 17 },
  "6.0": { co: 9, pbx: 9, pb: 11, pma: 12.5, pa: 14.5, pda: 17.5 },
  "6.5": { co: 9.5, pbx: 9.5, pb: 11.5, pma: 13, pa: 15, pda: 18 }
};

const tempos = { co: 2, pbx: 3, pb: 5, pma: 7, pa: 9, pda: 11 };

// Cálculo
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    co: parseInt(form.co.value) || 0,
    pbx: parseInt(form.pbx.value) || 0,
    pb: parseInt(form.pb.value) || 0,
    pma: parseInt(form.pma.value) || 0,
    pa: parseInt(form.pa.value) || 0,
    pda: parseInt(form.pda.value) || 0,
    agulha: form.agulha_proj.value
  };

  const tempoTotal = Object.keys(tempos).reduce((soma, tipo) => soma + (data[tipo] * tempos[tipo]), 0);
  const horas = Math.floor(tempoTotal / 3600);
  const minutos = Math.floor((tempoTotal % 3600) / 60);
  const segundos = Math.floor(tempoTotal % 60);

  const agulhaData = agulhas[data.agulha];
  const cm = agulhaData
    ? Object.keys(agulhaData).reduce((total, tipo) => total + (data[tipo] * agulhaData[tipo]), 0)
    : 0;
  const metros = cm / 100;

  resultadoDiv.innerHTML = `
    <h3>Resultado:</h3>
    <p><strong>Tempo estimado:</strong> ${horas}h ${minutos}min ${segundos}s</p>
    <p><strong>Comprimento estimado:</strong> ${metros.toFixed(2)} metros</p>
    <p><strong>Gramas estimadas:</strong> ${(metros * 4.2).toFixed(1)}g</p>
    <p><strong>Uso estimado:</strong> ${(metros * 4.0).toFixed(1)}g</p>
  `;

  Object.assign(form.dataset, {
    tempo: `${horas}h ${minutos}min ${segundos}s`,
    uso: (metros * 4.0).toFixed(1) + 'g',
    gramas: (metros * 4.2).toFixed(1) + 'g',
    agulha: data.agulha,
    metros: metros.toFixed(2)
  });

  salvarBtn.style.display = 'inline-block';
});

// Autenticação
async function abrirPopup() {
  const res = await fetch("../api/auth/verificarsessao.php");
  if (res.ok) {
    popupSalvar.showModal();
  } else {
    salvarTemporario();
    popupLogin.showModal();
  }
}

function salvarTemporario() {
  localStorage.setItem("projeto_temp", JSON.stringify({
    nome: document.getElementById('popup-nome').value,
    tempo: form.dataset.tempo,
    uso: form.dataset.uso,
    gramas: form.dataset.gramas,
    agulha: form.dataset.agulha,
    metros: form.dataset.metros
  }));
}

function restaurarTemporario() {
  const dados = JSON.parse(localStorage.getItem("projeto_temp"));
  if (!dados) return;

  document.getElementById('popup-nome').value = dados.nome || "";
  Object.assign(form.dataset, dados);

  resultadoDiv.innerHTML = `
    <h3>Resultado:</h3>
    <p><strong>Tempo estimado:</strong> ${dados.tempo}</p>
    <p><strong>Comprimento estimado:</strong> ${dados.metros} metros</p>
    <p><strong>Gramas estimadas:</strong> ${dados.gramas}</p>
    <p><strong>Uso estimado:</strong> ${dados.uso}</p>
  `;

  salvarBtn.style.display = 'inline-block';
  popupSalvar.showModal();
  localStorage.removeItem("projeto_temp");
}

// Login
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = new FormData(formLogin);
  const res = await fetch('../api/auth/login.php', { method: 'POST', body: dados });
  if (res.ok) {
    restaurarTemporario();
  } else {
    alert('Login falhou.');
  }
  popupLogin.close();
});

// Cadastro
formCadastro.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = new FormData(formCadastro);
  const res = await fetch('../api/auth/registrar.php', { method: 'POST', body: dados });
  if (res.ok) {
    restaurarTemporario();
  } else {
    alert('Erro ao cadastrar.');
  }
  popupLogin.close();
});

// Salvar Projeto
formSalvar.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('popup-nome').value;
  const imagem = inputImagem.files[0];

  if (!nome.trim()) return alert("Digite o nome do projeto.");
  if (imagem && imagem.size > 25 * 1024 * 1024) return alert("Imagem muito grande.");

  const dados = new FormData();
  dados.append("nome", nome);
  dados.append("imagem", imagem);
  dados.append("tempo", form.dataset.tempo);
  dados.append("uso", form.dataset.uso);
  dados.append("gramas", form.dataset.gramas);
  dados.append("agulha", form.dataset.agulha);
  dados.append("metros", form.dataset.metros);

  try {
    const res = await fetch("../api/projetos/salvar.php", { method: "POST", body: dados });
    const resultado = await res.json();

    if (!res.ok || resultado.erro) throw new Error(resultado.erro || "Erro desconhecido");

    alert(resultado.mensagem || "Projeto salvo com sucesso!");
    popupSalvar.close();
    formSalvar.reset();
    window.location.href = "../pages/perfil.php";
  } catch (err) {
    console.error("Erro ao salvar:", err);
    alert("Erro ao salvar o projeto.");
  }
});

// Imagem
inputImagem.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    previewContainer.style.display = 'none';
  }
});

function removerImagem() {
  inputImagem.value = '';
  previewContainer.style.display = 'none';
}

// Alternar Login/Cadastro
function trocarParaCadastro() {
  formLogin.style.display = "none";
  formCadastro.style.display = "block";
}
function trocarParaLogin() {
  formCadastro.style.display = "none";
  formLogin.style.display = "block";
}
function fecharPopup() {
  popupSalvar.close();
}
