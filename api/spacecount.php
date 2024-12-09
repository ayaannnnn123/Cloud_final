<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function countSpaces($text) {
    // Count all types of whitespace characters
    return preg_match_all('/\s/', $text);
}

// Check if text is provided via POST
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['text'])) {
    $text = $_POST['text'];

    // Validate input
    if (empty($text)) {
        http_response_code(400);
        echo json_encode(['error' => 'Text cannot be empty', 'spaceCount' => 0]);
        exit;
    }

    $spaceCount = countSpaces($text);
    echo json_encode(['spaceCount' => $spaceCount]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No text provided', 'spaceCount' => 0]);
}
?>