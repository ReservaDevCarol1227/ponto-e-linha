<?php
session_start();
require_once __DIR__ . '/../_core/config.php';

header('Content-Type: application/json');

$usuarioId = $_SESSION['usuario_id'] ?? null;
if (!$usuarioId) {
    http_response_code(401);
    echo json_encode(['success' => false, 'erro' => 'Usuário não autenticado']);
    exit;
}

$nome = trim($_POST['nome'] ?? '');
$senha = trim($_POST['senha'] ?? '');
$conf_senha = trim($_POST['conf_senha'] ?? '');

if ($nome === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'erro' => 'O nome é obrigatório']);
    exit;
}

if ($senha && $senha !== $conf_senha) {
    http_response_code(400);
    echo json_encode(['success' => false, 'erro' => 'As senhas não coincidem']);
    exit;
}

try {
    $sql = "UPDATE usuarios SET nome = :nome";
    $params = [':nome' => $nome];

    if ($senha !== '') {
        $sql .= ", senha = :senha";
        $params[':senha'] = password_hash($senha, PASSWORD_DEFAULT);
    }

    $sql .= " WHERE id = :id";
    $params[':id'] = $usuarioId;

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    $_SESSION['nome'] = $nome;

    echo json_encode([
        'success' => true,
        'mensagem' => 'Dados atualizados com sucesso'
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'erro' => 'Erro ao atualizar os dados: ' . $e->getMessage()
    ]);
}
