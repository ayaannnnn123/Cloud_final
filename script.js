// Function to get the word count from the backend API
function getWordCount() {
    const text = document.getElementById('textInput').value;

    fetch('/api/wordcount.php?text=' + encodeURIComponent(text))
        .then(response => response.json())
        .then(data => {
            document.getElementById('wordCount').textContent = 'Word Count: ' + data.wordCount;
        })
        .catch(error => console.error('Error:', error));
}

// Function to get the character count from the backend API
function getCharCount() {
    const text = document.getElementById('textInput').value;

    fetch('/api/charcount.php?text=' + encodeURIComponent(text))
        .then(response => response.json())
        .then(data => {
            document.getElementById('charCount').textContent = 'Character Count: ' + data.charCount;
        })
        .catch(error => console.error('Error:', error));
}

function getVowelCount() {
    var text = document.getElementById('textInput').value;
    fetch('http://localhost:8080/api/vowelcount.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('vowelCount').innerText = 'Vowel Count: ' + data.vowelCount;
    })
    .catch(error => console.error('Error:', error));
}

function getIntegerCount() {
    var text = document.getElementById('textInput').value;
    fetch('http://localhost:8080/api/integercount.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        if(data.integerCount !== undefined) {
            document.getElementById('integerCount').innerText = 'Integer Count: ' + data.integerCount;
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}


function getSpaceCount() {
    var text = document.getElementById('textInput').value;
    fetch('http://localhost:8080/api/spacecount.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        if(data.spaceCount !== undefined) {
            document.getElementById('spaceCount').innerText = 'Space Count: ' + data.spaceCount;
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}

function getSentenceCount() {
    var text = document.getElementById('textInput').value;
    fetch('http://localhost:8080/api/sentencecount.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => response.json())
    .then(data => {
        if(data.sentenceCount !== undefined) {
            document.getElementById('sentenceCount').innerText = 'Sentence Count: ' + data.sentenceCount;
        } else {
            console.error('Error:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}
