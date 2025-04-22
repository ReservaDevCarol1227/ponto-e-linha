<?php
session_start();
require_once '../config/config.php';

$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];
$conf_senha = $_POST['conf_senha'];

if ($senha !== $conf_senha) {
    echo "<script>alert('Senhas não coincidem'); window.history.back();</script>";
    exit;
}

$senhaCriptografada = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
$stmt->execute([$nome, $email, $senhaCriptografada]);

$_SESSION['usuario_id'] = $pdo->lastInsertId();
$_SESSION['nome'] = $nome;

header('Location: perfil.php');
