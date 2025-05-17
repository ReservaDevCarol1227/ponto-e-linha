<?php
session_start();
require_once __DIR__ . '/../_core/config.php';

header('Content-Type: application/json');

$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if ($usuario && password_verify($senha, $usuario['senha'])) {
    $_SESSION['usuario_id'] = $usuario['id'];
    $_SESSION['nome'] = $usuario['nome'];

    echo json_encode([
        'success' => true,
        'nome' => $usuario['nome'],
        'redirect' => '/pontoelinha/pages/calculadora.html'
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'erro' => 'Email ou senha inválidos'
    ]);
}
