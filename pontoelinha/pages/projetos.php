<?php
session_start();
require_once '../config/config.php';

$usuario_id = $_SESSION['usuario_id'];

$stmt = $pdo->prepare("SELECT * FROM projetos WHERE usuario_id = ?");
$stmt->execute([$usuario_id]);

header('Content-Type: application/json');
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
