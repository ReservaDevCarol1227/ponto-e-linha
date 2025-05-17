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

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;
$usuario_id = $_SESSION['usuario_id'];

if (!$id) {
  http_response_code(400);
  echo json_encode([
    'success' => false,
    'erro' => 'ID do projeto inválido'
  ]);
  exit;
}

$query = "DELETE FROM projetos WHERE id = :id AND usuario_id = :usuario_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);

if ($stmt->execute()) {
  echo json_encode([
    'success' => true,
    'mensagem' => 'Projeto excluído com sucesso'
  ]);
} else {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'erro' => 'Erro ao excluir o projeto'
  ]);
}