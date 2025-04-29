<?php
session_start();
require_once '../config/config.php';

$usuarioId = $_SESSION['usuario_id'] ?? null;
if (!$usuarioId) {
    die("ID de usuário não encontrado.");
}

$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$sql = "UPDATE usuarios SET nome = :nome, email = :email, senha = :senha WHERE id = :id";
$stmt = $pdo->prepare($sql);

$stmt->bindParam(':nome', $nome);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':senha', $senhaHash);
$stmt->bindParam(':id', $usuarioId, PDO::PARAM_INT);

if ($stmt->execute()) {
    echo "Dados atualizados com sucesso.";
} else {
    echo "Erro ao atualizar os dados.";
}
?>