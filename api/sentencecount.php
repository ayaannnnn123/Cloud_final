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

function countSentences($text) {
    // More robust sentence counting
    // Handles cases with multiple punctuation, spaces, and different sentence endings
    $text = trim($text);
    if (empty($text)) return 0;
    
    // Count sentences by splitting on sentence-ending punctuation
    $sentences = preg_split('/[.!?]+/', $text, -1, PREG_SPLIT_NO_EMPTY);
    
    // Filter out any remaining empty sentences
    $sentences = array_filter($sentences, function($sentence) {
        return trim($sentence) !== '';
    });

    return count($sentences);
}

// Check if text is provided via POST
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['text'])) {
    $text = trim($_POST['text']);

    // Validate input
    if (empty($text)) {
        http_response_code(400);
        echo json_encode(['error' => 'Text cannot be empty', 'sentenceCount' => 0]);
        exit;
    }

    $sentenceCount = countSentences($text);
    echo json_encode(['sentenceCount' => $sentenceCount]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No text provided', 'sentenceCount' => 0]);
}
?>