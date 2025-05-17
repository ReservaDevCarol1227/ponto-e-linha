<?php
session_start();
require_once __DIR__ . '/../_core/config.php';

header('Content-Type: application/json');

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(["success" => false, "erro" => "Usuário não autenticado."]);
    exit;
}

$nome = $_POST['nome'] ?? '';
$agulha = $_POST['agulha'] ?? '';
$gramas = $_POST['gramas'] ?? '';
$tempo = $_POST['tempo'] ?? '';
$uso = $_POST['uso'] ?? '';
$metros = $_POST['metros'] ?? null;
$usuario_id = $_SESSION['usuario_id'];
$nomeImagem = null;

if (!empty($_FILES['imagem']) && $_FILES['imagem']['error'] !== UPLOAD_ERR_NO_FILE) {
    if ($_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
        $tmp = $_FILES['imagem']['tmp_name'];
        $ext = strtolower(pathinfo($_FILES['imagem']['name'], PATHINFO_EXTENSION));
        $permitidas = ['jpg', 'jpeg', 'png', 'gif'];
        $tamanhoMax = 25 * 1024 * 1024;

        if (!in_array($ext, $permitidas)) {
            http_response_code(400);
            echo json_encode(["success" => false, "erro" => "Formato de imagem inválido."]);
            exit;
        }

        if ($_FILES['imagem']['size'] > $tamanhoMax) {
            http_response_code(400);
            echo json_encode(["success" => false, "erro" => "Imagem muito grande. Máximo: 25MB."]);
            exit;
        }

        $nomeImagem = uniqid('projeto_') . '.' . $ext;
        move_uploaded_file($tmp, __DIR__ . '/../../uploads/' . $nomeImagem);
    } else {
        http_response_code(400);
        echo json_encode(["success" => false, "erro" => "Erro no upload da imagem. Código: " . $_FILES['imagem']['error']]);
        exit;
    }
}

try {
    $stmt = $pdo->prepare("INSERT INTO projetos 
        (nome, agulha, gramas, tempo_estimado, uso_estimado, metros, imagem, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->execute([$nome, $agulha, $gramas, $tempo, $uso, $metros, $nomeImagem, $usuario_id]);

    echo json_encode(["success" => true, "mensagem" => "Projeto salvo com sucesso!"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "erro" => "Erro interno: " . $e->getMessage()]);
}
