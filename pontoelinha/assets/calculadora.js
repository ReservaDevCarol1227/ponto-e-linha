const form = document.getElementById('form-proj');
const resultadoDiv = document.getElementById('resultado');
const salvarBtn = document.getElementById('abrir-salvar');
const popupSalvar = document.getElementById('popup-salvar');
const popupLogin = document.getElementById('popup-login');
const formSalvar = document.getElementById('popup-form');
const formLogin = document.getElementById('login-form');
const formCadastro = document.getElementById('cadastro-form');

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

const tempos = {
  co: 2, pbx: 3, pb: 5, pma: 7, pa: 9, pda: 11
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    co: parseInt(document.getElementById('co').value) || 0,
    pbx: parseInt(document.getElementById('pbx').value) || 0,
    pb: parseInt(document.getElementById('pb').value) || 0,
    pma: parseInt(document.getElementById('pma').value) || 0,
    pa: parseInt(document.getElementById('pa').value) || 0,
    pda: parseInt(document.getElementById('pda').value) || 0,
    agulha: document.getElementById('agulha_proj').value
  };

  const tempoTotal = (data.co * tempos.co) + (data.pbx * tempos.pbx) +
    (data.pb * tempos.pb) + (data.pma * tempos.pma) +
    (data.pa * tempos.pa) + (data.pda * tempos.pda);

  const horas = Math.floor(tempoTotal / 3600);
  const minutos = Math.floor((tempoTotal % 3600) / 60);
  const segundos = Math.floor(tempoTotal % 60);

  const agulhaData = agulhas[data.agulha];
  let centimetros = 0;
  if (agulhaData) {
    centimetros = (data.co * agulhaData.co) + (data.pbx * agulhaData.pbx) +
      (data.pb * agulhaData.pb) + (data.pma * agulhaData.pma) +
      (data.pa * agulhaData.pa) + (data.pda * agulhaData.pda);
  }

  const metros = centimetros / 100;

  resultadoDiv.innerHTML = `
    <h3>Resultado:</h3>
    <p><strong>Tempo estimado:</strong> ${horas}h ${minutos}min ${segundos}s</p>
    <p><strong>Comprimento estimado de linha usada:</strong> ${metros.toFixed(2)} metros</p>
    <p><strong>Gramas estimadas:</strong> ${(metros * 4.2).toFixed(1)}g</p>
    <p><strong>Uso estimado:</strong> ${(metros * 4.0).toFixed(1)}g</p>
  `;

  form.dataset.tempo = `${horas}h ${minutos}min ${segundos}s`;
  form.dataset.uso = `${(metros * 4.0).toFixed(1)}g`;
  form.dataset.gramas = `${(metros * 4.2).toFixed(1)}g`;
  form.dataset.agulha = data.agulha;
  form.dataset.metros = metros.toFixed(2);

  salvarBtn.style.display = 'inline-block';
});

function abrirPopup() {
  fetch("../config/verifica_login.php")
    .then(res => {
      if (res.status === 200) {
        popupSalvar.showModal();
      } else {
        salvarTemporario();
        popupLogin.showModal();
      }
    });
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
  form.dataset.tempo = dados.tempo;
  form.dataset.uso = dados.uso;
  form.dataset.gramas = dados.gramas;
  form.dataset.agulha = dados.agulha;
  form.dataset.metros = dados.metros;

  resultadoDiv.innerHTML = `
    <h3>Resultado:</h3>
    <p><strong>Tempo estimado:</strong> ${dados.tempo}</p>
    <p><strong>Comprimento estimado de linha usada:</strong> ${dados.metros} metros</p>
    <p><strong>Gramas estimadas:</strong> ${dados.gramas}</p>
    <p><strong>Uso estimado:</strong> ${dados.uso}</p>
  `;

  salvarBtn.style.display = 'inline-block';
  popupSalvar.showModal();
  localStorage.removeItem("projeto_temp");
}

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  const dados = new FormData(formLogin);
  fetch('../config/autenticar.php', { method: 'POST', body: dados })
    .then(res => res.ok ? restaurarTemporario() : alert("Login falhou"))
    .finally(() => popupLogin.close());
});

formCadastro.addEventListener('submit', (e) => {
  e.preventDefault();
  const dados = new FormData(formCadastro);
  fetch('../config/registrar.php', { method: 'POST', body: dados })
    .then(res => res.ok ? restaurarTemporario() : alert("Erro ao cadastrar"))
    .finally(() => popupLogin.close());
});

formSalvar.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('popup-nome').value;
  const imagem = document.getElementById('popup-imagem').files[0];

  if (!nome.trim()) {
    alert("Digite o nome do projeto.");
    return;
  }

  if (imagem && imagem.size > 25 * 1024 * 1024) {
    alert("Imagem muito grande. Máximo: 25MB.");
    return;
  }

  const dados = new FormData();
  dados.append("nome", nome);
  dados.append("imagem", imagem);
  dados.append("tempo", form.dataset.tempo);
  dados.append("uso", form.dataset.uso);
  dados.append("gramas", form.dataset.gramas);
  dados.append("agulha", form.dataset.agulha);
  dados.append("metros", form.dataset.metros);

  fetch("../config/salvar.php", {
    method: "POST",
    body: dados
  })
    .then(res => res.json())
    .then(res => {
      if (res.erro) {
        alert("Erro: " + res.erro);
        return;
      }

      alert(res.mensagem || "Projeto salvo com sucesso!");
      popupSalvar.close();
      formSalvar.reset();
      window.location.href = "../config/perfil.php";
    })
    .catch(err => {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar o projeto.");
    });
});

inputImagem.addEventListener('change', function () {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
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

