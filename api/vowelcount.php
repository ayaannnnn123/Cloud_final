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

function countVowels($text) {
    // Define vowels with UTF-8 support for international characters
    $vowels = 'aeiouAEIOUáéíóúÁÉÍÓÚäëïöüÄËÏÖÜâêîôûÂÊÎÔÛ';
    $count = 0;

    // Multibyte safe vowel counting
    for ($i = 0; $i < mb_strlen($text); $i++) {
        $char = mb_substr($text, $i, 1);
        if (mb_strpos($vowels, $char) !== false) {
            $count++;
        }
    }

    return $count;
}

// Check if the text is provided via POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['text'])) {
    $text = trim($_POST['text']);

    // Validate input
    if (empty($text)) {
        http_response_code(400);
        echo json_encode(['error' => 'Text cannot be empty', 'vowelCount' => 0]);
        exit;
    }

    $vowelCount = countVowels($text);
    echo json_encode(['vowelCount' => $vowelCount]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No text provided', 'vowelCount' => 0]);
}
?>