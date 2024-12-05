<?php
// Enable error reporting for troubleshooting (optional in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

function countSpaces($text) {
    // Count spaces using substr_count
    return substr_count($text, ' ');
}

// Check if text is provided via POST
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['text'])) {
    $spaceCount = countSpaces($_POST['text']);
    echo json_encode(array('spaceCount' => $spaceCount));
} else {
    echo json_encode(array('error' => 'No text provided'));
}
?>
