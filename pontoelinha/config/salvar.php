<?php
session_start();
require_once '../config/config.php';

header('Content-Type: application/json');

try {
    if (!isset($_SESSION['usuario_id'])) {
        http_response_code(401);
        echo json_encode(["erro" => "Usuário não autenticado."]);
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

    if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] !== UPLOAD_ERR_NO_FILE) {
        if ($_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
            $tmp = $_FILES['imagem']['tmp_name'];
            $nomeOriginal = basename($_FILES['imagem']['name']);
            $ext = strtolower(pathinfo($nomeOriginal, PATHINFO_EXTENSION));
            $permitidas = ['jpg', 'jpeg', 'png', 'gif'];
            $tamanhoMax = 25 * 1024 * 1024;

            if (!in_array($ext, $permitidas)) {
                http_response_code(400);
                echo json_encode(["erro" => "Formato de imagem inválido."]);
                exit;
            }

            if ($_FILES['imagem']['size'] > $tamanhoMax) {
                http_response_code(400);
                echo json_encode(["erro" => "Imagem muito grande. Máximo: 25MB."]);
                exit;
            }

            $nomeImagem = uniqid('projeto_') . '.' . $ext;
            move_uploaded_file($tmp, "../uploads/" . $nomeImagem);
        } else {
            http_response_code(400);
            echo json_encode(["erro" => "Erro no upload da imagem. Código: " . $_FILES['imagem']['error']]);
            exit;
        }
    }

    $stmt = $pdo->prepare("INSERT INTO projetos 
        (nome, agulha, gramas, tempo_estimado, uso_estimado, metros, imagem, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->execute([
        $nome,
        $agulha,
        $gramas,
        $tempo,
        $uso,
        $metros,
        $nomeImagem,
        $usuario_id
    ]);

    echo json_encode(["mensagem" => "Projeto salvo com sucesso!"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro interno: " . $e->getMessage()]);
}
