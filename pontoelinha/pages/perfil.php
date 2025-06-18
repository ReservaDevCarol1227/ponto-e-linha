<?php
session_start();
if (!isset($_SESSION['usuario_id'])) {
    header("Location: ../pages/login.html");
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <title>Meu Perfil — Ponto&Linha</title>
  <link rel="stylesheet" href="../assets/style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 2rem;
      max-width: 800px;
      margin: auto;
    }
    button {
      margin: 5px 0;
      padding: 10px 20px;
      font-size: 1rem;
    }
    #projetos {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <header>
    <h1>Olá, <?= htmlspecialchars($_SESSION['nome']) ?>!</h1>
  </header>

  <section id="projetos">
    <h2>Meus projetos:</h2>
    <!-- Conteúdo será inserido via JS -->
  </section>

  <nav style="margin-top: 30px;">
    <button onclick="location.href='../pages/calculadora.html'">Calculadora</button>
    <button onclick="location.href='../pages/configconta.html'">Configurações</button>
    <button id="btn-logout" type="button">Sair</button>
  </nav>

  <script src="../assets/perfilscript.js"></script>
</body>
</html>
