<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (isset($_GET['text'])) {
    $text = $_GET['text'];

    // Validate input
    if (empty($text)) {
        http_response_code(400);
        echo json_encode(['error' => 'Text cannot be empty', 'charCount' => 0]);
        exit;
    }

    // Count characters, excluding spaces with additional safety
    $charCount = strlen(preg_replace('/\s/', '', $text));

    echo json_encode(['charCount' => $charCount]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No text provided', 'charCount' => 0]);
}
?>