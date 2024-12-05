<?php
// Enable error reporting for troubleshooting (optional in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

function countSentences($text) {
    // Count sentences based on periods, question marks, or exclamation marks
    return preg_match_all('/[.!?]+[ \n\r\t]*\b/', $text);
}

// Check if text is provided via POST
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['text'])) {
    $sentenceCount = countSentences($_POST['text']);
    echo json_encode(array('sentenceCount' => $sentenceCount));
} else {
    echo json_encode(array('error' => 'No text provided'));
}
?>
