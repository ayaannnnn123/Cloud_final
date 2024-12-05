<?php
// Enable error reporting for troubleshooting (optional in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

function countIntegers($text) {
    // Use regex to find all matches of integers in the text
    preg_match_all('/\d+/', $text, $matches);
    // Count the number of matches
    return count($matches[0]);
}

// Check if text is provided via POST
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['text'])) {
    $integerCount = countIntegers($_POST['text']);
    echo json_encode(array('integerCount' => $integerCount));
} else {
    echo json_encode(array('error' => 'No text provided'));
}
?>
