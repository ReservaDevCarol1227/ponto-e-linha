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
  <title>Meu Perfil</title>
</head>
<body>
  <h1>Olá, <?= $_SESSION['nome'] ?>!</h1>
  <div id="projetos"><h4>Meus projetos:</h4></div>
  <a href="../pages/calculadora.html">
  <button style="margin-bottom: 15px;">Calculadora</button>
</a>
<a href="../pages/configconta.html">
  <button style="margin-bottom: 15px;">Configurações</button>
</a>
  <a href="logout.php">Sair</a>

  <script src="../assets/perfilscript.js"></script>
</body>
</html>
