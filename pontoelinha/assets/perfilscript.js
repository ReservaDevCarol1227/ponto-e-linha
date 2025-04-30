let projetos = [];
//Pega informações do projeto
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

  //Aqui estão os botões e o detalhe do projeto
        projetoDiv.innerHTML = `
  <button onclick="toggleProjeto(${i})" style="font-size: 16px; padding: 5px 10px;">
    ${proj.nome}
  </button>

  <div id="detalhes-${i}" style="display: none; margin-left: 15px; margin-top: 10px;">
    <p><strong>Agulha:</strong> ${proj.agulha}</p>
    <p><strong>Padrão:</strong> ${proj.padrao || 'N/A'}</p>
    <p><strong>Gramas:</strong> ${proj.gramas}</p>
    <p><strong>Tempo estimado:</strong> ${proj.tempo_estimado}</p>
    <p><strong>Uso estimado:</strong> ${proj.uso_estimado}</p>
    <p><strong>Criado em:</strong> ${new Date(proj.criado_em).toLocaleDateString('pt-BR')}</p>
    ${proj.imagem ? `<img src="../uploads/${proj.imagem}" alt="Imagem do projeto" style="max-width:100%; margin-top:10px;">` : ''}
    
    <button onclick="mostrarFormularioEditar(${i})" style="margin-top: 10px; font-size: 14px; padding: 4px 8px;">
      Editar nome do projeto
    </button>  
    
    <button onclick="excluirprojeto(${i})" style="margin-top: 10px; font-size: 14px; padding: 4px 8px;"">
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
//Funcionalidade do detalhe
  function toggleProjeto(id) {
    const detalhes = document.getElementById(`detalhes-${id}`);
    const isVisible = detalhes.style.display === 'block';

    detalhes.style.display = isVisible ? 'none' : 'block';
  }
//Funcionalidade de alterar nome
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
    headers: {
      'Content-Type': 'application/json'
    },
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
    headers: {
      'Content-Type': 'application/json'
    },
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
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id }) // este ID não está sendo usado no PHP, mas pode ser mantido se quiser
  })
  .then(res => res.json())
  .then(response => {
    if (response.success) {
      alert('Conta excluída com sucesso!');
      window.location.href = '../pages/index.html'; // redireciona após exclusão
    } else {
      alert('Erro ao excluir a conta: ' + (response.error || 'Erro desconhecido'));
    }
  })
  .catch(() => {
    alert('Erro ao conectar com o servidor.');
  });
}
