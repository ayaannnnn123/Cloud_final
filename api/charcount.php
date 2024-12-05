<?php
header('Content-Type: application/json');

if (isset($_GET['text'])) {
    $text = $_GET['text'];

    // Count characters, excluding spaces
    $charCount = strlen(str_replace(' ', '', $text));

    echo json_encode(['charCount' => $charCount]);
} else {
    echo json_encode(['error' => 'No text provided']);
}
