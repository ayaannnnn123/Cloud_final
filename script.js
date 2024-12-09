// [All your existing functions from getWordCount through getSpaceCount stay exactly the same]

function getSentenceCount() {
    var text = document.getElementById('textInput').value;

    if (!text) {
        document.getElementById('sentenceCount').innerText = 'Sentence Count: 0';
        return;
    }

    fetch('http://localhost:3000/api/sentencecount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if(data.sentenceCount !== undefined) {
            document.getElementById('sentenceCount').innerText = 'Sentence Count: ' + data.sentenceCount;
        } else {
            console.error('Error:', data.error);
            document.getElementById('sentenceCount').innerText = 'Error getting sentence count';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('sentenceCount').innerText = 'Error getting sentence count';
    });
} // getSentenceCount ends here - notice there's no nested functions anymore

// Now the save and load functions are at the root level
function saveText() {
    const text = document.getElementById('textInput').value;
    if (!text) {
        document.getElementById('saveStatus').textContent = 'Please enter some text first';
        return;
    }

    fetch('http://localhost:3000/api/savetext', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'text=' + encodeURIComponent(text)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('saveStatus').textContent = 'Text saved! Your ID: ' + data.id;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('saveStatus').textContent = 'Error saving text';
    });
}

function loadText() {
    const id = document.getElementById('textId').value;
    if (!id) {
        document.getElementById('saveStatus').textContent = 'Please enter an ID';
        return;
    }

    fetch('http://localhost:3000/api/gettext?id=' + encodeURIComponent(id))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.text) {
                document.getElementById('textInput').value = data.text;
                document.getElementById('saveStatus').textContent = 'Text loaded successfully!';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('saveStatus').textContent = 'Error loading text';
        });
}