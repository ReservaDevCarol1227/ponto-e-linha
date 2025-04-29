<?php include 'verifica_login.php'; ?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Meu Perfil</title>
</head>
<body>
  <h1>Olá, <?= $_SESSION['nome'] ?>!</h1>
  <div id="projetos"></div>
  <a href="../pages/calculadora.html">
  <button style="margin-bottom: 15px;">Calculadora</button>
</a>
<a href="../pages/configconta.html">
  <button style="margin-bottom: 15px;">Configurações</button>
</a>
  <a href="logout.php">Sair</a>

  <script>
  let projetos = []; // <- define aqui no começo como global

fetch('../config/projetos.php')
  .then(res => res.json())
  .then(data => {
    projetos = data; // <- agora salva os projetos aqui
    const container = document.getElementById('projetos');

    if (projetos.length === 0) {
      container.innerHTML = "<p>Você ainda não tem projetos salvos.</p>";
      return;
    }

      projetos.forEach((proj, i) => {
        const projetoDiv = document.createElement('div');
        projetoDiv.style.marginBottom = '20px';


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
            ${proj.imagem ? `<img src="../uploads/${proj.imagem}" alt="Imagem do projeto" style="max-width:100%; margin-top:10px;">` : ''}
          </div>
        `;

        projetoDiv.innerHTML = `
        <button onclick="toggleProjeto(${i})" style="font-size: 16px; padding: 5px 10px;">
          ${proj.nome}
        </button>
        <button onclick="mostrarFormularioEditar(${i})" style="margin-left: 10px; font-size: 14px; padding: 4px 8px;">
          Editar
        </button>
        <div id="detalhes-${i}" style="display: none; margin-left: 15px; margin-top: 10px;">
          <p><strong>Agulha:</strong> ${proj.agulha}</p>
          <p><strong>Padrão:</strong> ${proj.padrao || 'N/A'}</p>
          <p><strong>Gramas:</strong> ${proj.gramas}</p>
          <p><strong>Tempo estimado:</strong> ${proj.tempo_estimado}</p>
          <p><strong>Uso estimado:</strong> ${proj.uso_estimado}</p>
          ${proj.imagem ? `<img src="../uploads/${proj.imagem}" alt="Imagem do projeto" style="max-width:100%; margin-top:10px;">` : ''}
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
    const isVisible = detalhes.style.display === 'block';

    detalhes.style.display = isVisible ? 'none' : 'block';
  }
  function mostrarFormularioEditar(id) {
  
  document.getElementById(`detalhes-${id}`).style.display = 'none';
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


</script>
</body>
</html>
