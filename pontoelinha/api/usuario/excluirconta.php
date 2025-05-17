<?php
session_start();
require_once __DIR__ . '/../_core/config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'erro' => 'Usuário não autenticado'
    ]);
    exit;
}

try {
    $usuario_id = $_SESSION['usuario_id'];
    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = :id");
    $stmt->bindParam(':id', $usuario_id, PDO::PARAM_INT);
    $stmt->execute();

    session_destroy();

    echo json_encode([
        'success' => true,
        'mensagem' => 'Conta excluída com sucesso'
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'erro' => 'Erro ao excluir a conta: ' . $e->getMessage()
    ]);
}
