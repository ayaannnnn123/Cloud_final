<?php
header('Content-Type: application/json');
require_once('../storage/db.php');

if (isset($_GET['id'])) {
    $storage = new TextStorage();
    $text = $storage->getText($_GET['id']);
    if ($text !== null) {
        echo json_encode(['text' => $text]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Text not found']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No ID provided']);
}
?>