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
  <a href="logout.php">Sair</a>

  <script>
  fetch('../config/projetos.php')
    .then(res => res.json())
    .then(projetos => {
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

        container.appendChild(projetoDiv);
      });
    });

  function toggleProjeto(id) {
    const detalhes = document.getElementById(`detalhes-${id}`);
    const isVisible = detalhes.style.display === 'block';

    detalhes.style.display = isVisible ? 'none' : 'block';
  }
</script>
</body>
</html>
