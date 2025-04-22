<?php
session_start();
if (!isset($_SESSION['usuario_id'])) {
    header('Location: ../pages/login.html');
    exit;
}
