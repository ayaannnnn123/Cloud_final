<?php
// Function to count vowels in a string
function countVowels($text) {
    // Define vowels
    $vowels = 'aeiouAEIOU';
    $count = 0;

    // Count the vowels
    for ($i = 0; $i < strlen($text); $i++) {
        if (strpos($vowels, $text[$i]) !== false) {
            $count++;
        }
    }

    return $count;
}

// Check if the text is provided via POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['text'])) {
    $vowelCount = countVowels($_POST['text']);
    echo json_encode(array('vowelCount' => $vowelCount));
} else {
    echo json_encode(array('error' => 'No text provided'));
}
?>
