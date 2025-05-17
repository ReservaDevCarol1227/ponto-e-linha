<?php
session_start();
require_once __DIR__ . '/../_core/config.php';

header('Content-Type: application/json');

$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$conf_senha = $_POST['conf_senha'] ?? '';

if (!$nome || !$email || !$senha || !$conf_senha) {
    http_response_code(400);
    echo json_encode(['success' => false, 'erro' => 'Todos os campos são obrigatórios']);
    exit;
}

if ($senha !== $conf_senha) {
    http_response_code(400);
    echo json_encode(['success' => false, 'erro' => 'Senhas não coincidem']);
    exit;
}

try {
    $senhaCriptografada = password_hash($senha, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
    $stmt->execute([$nome, $email, $senhaCriptografada]);

    $_SESSION['usuario_id'] = $pdo->lastInsertId();
    $_SESSION['nome'] = $nome;

    echo json_encode([
        'success' => true,
        'mensagem' => 'Usuário registrado com sucesso',
        'redirect' => '../pages/perfil.php'
    ]);
} catch (PDOException $e) {
    http_response_code(409); // Conflito: email já cadastrado
    echo json_encode([
        'success' => false,
        'erro' => 'Erro ao registrar: ' . ($e->errorInfo[1] == 1062 ? 'Email já cadastrado' : $e->getMessage())
    ]);
}
