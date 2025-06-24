let projetos = [];

fetch('../api/projetos/listar.php')
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      document.getElementById('projetos').innerHTML = "<p>Erro ao carregar projetos.</p>";
      return;
    }

    projetos = data.projetos;
    const container = document.getElementById('projetos');

    if (projetos.length === 0) {
      container.innerHTML += "<p>Você ainda não tem projetos salvos.</p>";
      return;
    }

    projetos.forEach((proj, i) => {
      const projetoDiv = document.createElement('div');
      projetoDiv.style.marginBottom = '20px';

      projetoDiv.innerHTML = `
        <button class="botao-expansivel" id="btn-${i}">
          <strong class="projeto-nome">${proj.nome}</strong>
            <div class="projeto-resumo" id="resumo-${i}">
               <span class="projeto-tempo"><strong>Tempo:</strong> ${proj.tempo_estimado}</span><br>
          <span class="projeto-uso"><strong>Uso:</strong> ${proj.uso_estimado}</span>
        </div>
        </button>

        <div id="detalhes-${i}" style="display: none; margin-left: 15px; margin-top: 10px;">
          <p><strong>Agulha:</strong> ${proj.agulha}</p>
          <p><strong>Gramas:</strong> ${proj.gramas}</p>
          <p><strong>Tempo estimado:</strong> ${proj.tempo_estimado}</p>
          <p><strong>Uso estimado:</strong> ${proj.uso_estimado}</p>
          <p><strong>Comprimento (metros):</strong> ${proj.metros || 'N/A'} m</p>
          <p><strong>Criado em:</strong> ${new Date(proj.criado_em).toLocaleDateString('pt-BR')}</p>
          ${proj.imagem ? `<img src="../uploads/${proj.imagem}" alt="Imagem do projeto">` : ''}
          <button class="button" onclick="mostrarFormularioEditar(${i})">Editar nome do projeto</button>
          <button class="button danger" onclick="excluirprojeto(${i})">Excluir Projeto</button>
        </div>

        <div id="formulario-editar-${i}" style="display: none; margin-top: 15px;">
          <input type="text" id="editar-nome-${i}" value="${proj.nome}" placeholder="Novo nome do projeto">
          <button class="button" onclick="editarProjeto(${i})">Salvar Alterações</button>
        </div>
      `;

      const botao = projetoDiv.querySelector(`#btn-${i}`);
      botao.addEventListener('click', () => toggleProjeto(i));

      container.appendChild(projetoDiv);
    });
  });

function toggleProjeto(id) {
  const detalhes = document.getElementById(`detalhes-${id}`);
  const aberto = detalhes.style.display === 'block';
  detalhes.style.display = aberto ? 'none' : 'block';

  const nome = projetos[id].nome;
  const tempo = projetos[id].tempo_estimado;
  const uso = projetos[id].uso_estimado;

  const botao = document.getElementById(`btn-${id}`);
  const nomeEl = botao.querySelector('.projeto-nome');
  const tempoEl = botao.querySelector('.projeto-tempo');
  const usoEl = botao.querySelector('.projeto-uso');

  nomeEl.textContent = nome;

  tempoEl.innerHTML = `<strong>Tempo:</strong> ${tempo}`;
  usoEl.innerHTML = `<strong>Uso:</strong> ${uso}`;

  const resumo = document.getElementById(`resumo-${id}`);
  if (resumo) resumo.style.display = aberto ? 'block' : 'none';
}

function mostrarFormularioEditar(id) {
  document.getElementById(`formulario-editar-${id}`).style.display = 'block';
}

function editarProjeto(id) {
  const nomeNovo = document.getElementById(`editar-nome-${id}`).value;

  if (nomeNovo.trim() === '') {
    alert('O nome do projeto não pode ser vazio!');
    return;
  }

  const projeto = projetos[id];

  fetch('../api/projetos/editar.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: projeto.id, nome: nomeNovo })
  })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        alert('Projeto atualizado com sucesso!');
        location.reload();
      } else {
        alert('Erro ao atualizar o projeto.');
      }
    });
}

function excluirprojeto(id) {
  if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

  const projeto = projetos[id];

  fetch('../api/projetos/excluir.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: projeto.id })
  })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        alert('Projeto excluído com sucesso!');
        location.reload();
      } else {
        alert('Erro ao excluir o projeto.');
      }
    })
    .catch(() => {
      alert('Erro ao conectar com o servidor.');
    });
}

function excluirconta(id) {
  if (!confirm("Tem certeza que deseja excluir sua conta?")) return;

  fetch('../api/usuario/excluirconta.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        alert('Conta excluída com sucesso!');
        window.location.href = '../pages/index.html';
      } else {
        alert('Erro ao excluir a conta: ' + (response.error || 'Erro desconhecido'));
      }
    })
    .catch(() => {
      alert('Erro ao conectar com o servidor.');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      fetch('../api/auth/logout.php')
        .then(res => res.json())
        .then(data => {
          if (data.success && data.redirect) {
            window.location.href = data.redirect;
          } else {
            alert('Erro ao fazer logout.');
          }
        })
        .catch(() => {
          alert('Erro de conexão com o servidor.');
        });
    });
  }
});
