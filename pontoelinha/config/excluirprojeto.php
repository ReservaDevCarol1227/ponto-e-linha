<?php
session_start();
require_once 'config.php'; 

if (!isset($_SESSION['usuario_id'])) {
  echo json_encode(['success' => false, 'message' => 'Usuário não logado']);
  exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$id = $data['id'] ?? null;
$usuario_id = $_SESSION['usuario_id'];

if (!$id) {
  echo json_encode(['success' => false, 'message' => 'ID inválido']);
  exit;
}

$query = "DELETE FROM projetos WHERE id = :id AND usuario_id = :usuario_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->bindParam(':usuario_id', $usuario_id, PDO::PARAM_INT);

if ($stmt->execute()) {
  echo json_encode(['success' => true, 'message' => 'Projeto excluído com sucesso']);
} else {
  echo json_encode(['success' => false, 'message' => 'Erro ao excluir o projeto']);
}
?>
