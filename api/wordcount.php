<?php
header('Content-Type: application/json');

if (isset($_GET['text'])) {
    $text = $_GET['text'];

    // Trim the text to remove leading/trailing spaces and count the words
    $text = trim($text);
    
    // Split text by spaces and filter out empty strings (in case there are multiple spaces)
    $words = preg_split('/\s+/', $text);
    $wordCount = count($words);

    // Return the word count as JSON
    echo json_encode(['wordCount' => $wordCount]);
} else {
    echo json_encode(['error' => 'No text provided']);
}
