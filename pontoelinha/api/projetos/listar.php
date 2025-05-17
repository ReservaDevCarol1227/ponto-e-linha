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

$usuario_id = $_SESSION['usuario_id'];

try {
  $stmt = $pdo->prepare("SELECT * FROM projetos WHERE usuario_id = ?");
  $stmt->execute([$usuario_id]);
  $projetos = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode([
    'success' => true,
    'projetos' => $projetos
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode([
    'success' => false,
    'erro' => 'Erro ao buscar projetos'
  ]);
}