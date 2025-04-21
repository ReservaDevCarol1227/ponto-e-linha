<?php
session_start();
require_once '../config/config.php';

$email = $_POST['email'];
$senha = $_POST['senha'];

$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if ($usuario && password_verify($senha, $usuario['senha'])) {
    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['nome'] = $usuario['nome'];
    header('Location: perfil.php');
    exit;
} else {
    echo "<script>alert('Email ou senha inválidos'); window.history.back();</script>";
}
