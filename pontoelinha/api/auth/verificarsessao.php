<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode([
        'autenticado' => false,
        'erro' => 'Usuário não logado'
    ]);
    exit;
}

http_response_code(200);
echo json_encode([
    'autenticado' => true,
    'usuario_id' => $_SESSION['usuario_id'],
    'nome' => $_SESSION['nome']
]);
