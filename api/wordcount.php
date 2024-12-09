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
    $text = trim($_GET['text']);
    
    // Additional validation
    if (empty($text)) {
        http_response_code(400);
        echo json_encode(['error' => 'Text cannot be empty', 'wordCount' => 0]);
        exit;
    }
    
    // Split text by spaces and filter out empty strings
    $words = preg_split('/\s+/', $text);
    $wordCount = count(array_filter($words));

    echo json_encode(['wordCount' => $wordCount]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No text provided', 'wordCount' => 0]);
}
?>