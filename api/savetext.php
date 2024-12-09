
<?php
header('Content-Type: application/json');
require_once('../storage/db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['text'])) {
    $storage = new TextStorage();
    $id = $storage->saveText($_POST['text']);
    echo json_encode(['id' => $id]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No text provided']);
}
?>