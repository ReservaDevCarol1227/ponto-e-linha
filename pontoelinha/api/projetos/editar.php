<?php
session_start();
require_once __DIR__ . '/../_core/config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['usuario_id'])) {
  http_response_code(401);
  echo json_encode(['success' => false, 'erro' => 'Usuário não autenticado']);
  exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$novo_nome = trim($data['nome'] ?? '');
$usuario_id = $_SESSION['usuario_id'];

if (!$id || $novo_nome === '') {
  http_response_code(400);
  echo json_encode(['success' => false, 'erro' => 'Dados inválidos']);
  exit;
}

$query = "UPDATE projetos SET nome = :nome WHERE id = :id AND usuario_id = :usuario_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':nome', $novo_nome);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);

if ($stmt->execute()) {
  echo json_encode([
    'success' => true,
    'mensagem' => 'Projeto atualizado com sucesso'
  ]);
} else {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'erro' => 'Erro ao atualizar o projeto'
  ]);
}