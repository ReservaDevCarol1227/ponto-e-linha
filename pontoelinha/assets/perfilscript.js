let projetos = [];

fetch('../config/projetos.php')
  .then(res => res.json())
  .then(data => {
    projetos = data;
    const container = document.getElementById('projetos');

    if (projetos.length === 0) {
      container.innerHTML = "<p>Você ainda não tem projetos salvos.</p>";
      return;
    }

    projetos.forEach((proj, i) => {
      const projetoDiv = document.createElement('div');
      projetoDiv.style.marginBottom = '20px';
    
      projetoDiv.innerHTML = `
        <button onclick="toggleProjeto(${i})" style="font-size: 16px; padding: 10px; text-align: left; width: 100%; background: #f0f0f0; border: 1px solid #ccc;">
          <strong>${proj.nome}</strong><br>
          <span><strong>Tempo:</strong> ${proj.tempo_estimado}</span><br>
          <span><strong>Uso:</strong> ${proj.uso_estimado}</span>
        </button>
    
        <div id="detalhes-${i}" style="display: none; margin-left: 15px; margin-top: 10px;">
          <p><strong>Agulha:</strong> ${proj.agulha}</p>
          <p><strong>Gramas:</strong> ${proj.gramas}</p>
          <p><strong>Tempo estimado:</strong> ${proj.tempo_estimado}</p>
          <p><strong>Uso estimado:</strong> ${proj.uso_estimado}</p>
          <p><strong>Comprimento (metros):</strong> ${proj.metros || 'N/A'} m</p>
          <p><strong>Criado em:</strong> ${new Date(proj.criado_em).toLocaleDateString('pt-BR')}</p>
    
          ${proj.imagem ? `<img src="../uploads/${proj.imagem}" alt="Imagem do projeto" style="max-width:100%; margin-top:10px;">` : ''}
    
          <button onclick="mostrarFormularioEditar(${i})" style="margin-top: 10px; font-size: 14px; padding: 4px 8px;">
            Editar nome do projeto
          </button>  
    
          <button onclick="excluirprojeto(${i})" style="margin-top: 10px; font-size: 14px; padding: 4px 8px;">
            Excluir Projeto
          </button>
        </div>
    
        <div id="formulario-editar-${i}" style="display: none; margin-top: 15px;">
          <input type="text" id="editar-nome-${i}" value="${proj.nome}" placeholder="Novo nome do projeto" style="padding: 5px 10px; width: 100%;">
          <button onclick="editarProjeto(${i})" style="padding: 5px 10px; margin-top: 10px;">Salvar Alterações</button>
        </div>
      `;
    
      container.appendChild(projetoDiv);
    });
  });

  function toggleProjeto(id) {
    const detalhes = document.getElementById(`detalhes-${id}`);
    const botao = detalhes.previousElementSibling;
  
    const aberto = detalhes.style.display === 'block';
    detalhes.style.display = aberto ? 'none' : 'block';
  
    botao.innerHTML = aberto
      ? `
        <strong>${projetos[id].nome}</strong><br>
        <span><strong>Tempo:</strong> ${projetos[id].tempo_estimado}</span><br>
        <span><strong>Uso:</strong> ${projetos[id].uso_estimado}</span>
      `
      : `<strong>${projetos[id].nome}</strong>`;
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

  fetch('../config/editprojeto.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: projeto.id,
      nome: nomeNovo
    })
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
  const confirmacao = confirm("Tem certeza que deseja excluir este projeto?");
  if (!confirmacao) return;

  const projeto = projetos[id];

  fetch('../config/excluirprojeto.php', {
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
  const confirmacao = confirm("Tem certeza que deseja excluir sua conta?");
  if (!confirmacao) return;

  fetch('../config/excluirconta.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id })
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
