<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    http_response_code(401);
    echo json_encode(['autenticado' => false]);
    exit;
}

http_response_code(200);
echo json_encode(['autenticado' => true]);