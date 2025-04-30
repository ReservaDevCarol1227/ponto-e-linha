<?php
session_start();
require_once 'config.php';

// Retorna JSON sempre
header('Content-Type: application/json');

// Verifica se está logado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(['success' => false, 'error' => 'Usuário não autenticado']);
    exit;
}

try {
    // ID do usuário vindo da sessão
    $usuario_id = $_SESSION['usuario_id'];

    // Executa o DELETE
    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = :id");
    $stmt->bindParam(':id', $usuario_id, PDO::PARAM_INT);
    $stmt->execute();

    // Destroi a sessão
    session_destroy();

    // Retorna sucesso para o JavaScript
    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
