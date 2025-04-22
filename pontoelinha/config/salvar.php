<?php
session_start();
require_once '../config/config.php';

$nome = $_POST['nome'];
$agulha = $_POST['agulha'];
$padrao = $_POST['padrao'];
$gramas = $_POST['gramas'];
$tempo = $_POST['tempo'];
$uso = $_POST['uso'];
$usuario_id = $_SESSION['usuario_id'];

$nomeImagem = '';

if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
    $tmp = $_FILES['imagem']['tmp_name'];
    $nomeOriginal = basename($_FILES['imagem']['name']);
    $ext = strtolower(pathinfo($nomeOriginal, PATHINFO_EXTENSION));
    $permitidas = ['jpg', 'jpeg', 'png', 'gif'];

    if (in_array($ext, $permitidas)) {
        $nomeImagem = uniqid('projeto_') . '.' . $ext;
        move_uploaded_file($tmp, "../uploads/" . $nomeImagem);
    }
}

$stmt = $pdo->prepare("INSERT INTO projetos 
(nome, agulha, gramas, tempo_estimado, uso_estimado, imagem, usuario_id) 
VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([$nome, $agulha, $gramas, $tempo, $uso, $nomeImagem, $usuario_id]);

echo json_encode(["mensagem" => "Projeto salvo com sucesso!"]);