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

function countIntegers($text) {
    // Use regex to find all matches of integers in the text
    preg_match_all('/\d+/', $text, $matches);
    // Count the number of matches
    return count($matches[0]);
}

// Check if text is provided via POST
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['text'])) {
    $text = trim($_POST['text']);

    // Validate input
    if (empty($text)) {
        http_response_code(400);
        echo json_encode(['error' => 'Text cannot be empty', 'integerCount' => 0]);
        exit;
    }

    $integerCount = countIntegers($text);
    echo json_encode(['integerCount' => $integerCount]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No text provided', 'integerCount' => 0]);
}
?>