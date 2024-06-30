let data = { lines: [] };
let currentTextIndex = -1;

// Fetch the initial data from the JSON file
fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log('Data loaded:', data);
    })
    .catch(error => console.error('Error loading data:', error));

document.getElementById('fetchButton').addEventListener('click', fetchRandomText);
document.getElementById('deleteButton').addEventListener('click', deleteCurrentText);
document.getElementById('addButton').addEventListener('click', showAddTextForm);
document.getElementById('closeButton').addEventListener('click', closeAddTextForm);
document.getElementById('submitButton').addEventListener('click', addNewText);

function fetchRandomText() {
    if (data.lines.length > 0) {
        currentTextIndex = Math.floor(Math.random() * data.lines.length);
        document.getElementById('displayText1').innerText = data.lines[currentTextIndex].question;
        document.getElementById('displayText2').innerText = data.lines[currentTextIndex].explanation;
        document.getElementById('displayText3').innerText = data.lines[currentTextIndex].answer;
        document.getElementById('displayText4').innerText = data.lines[currentTextIndex].example;

    } else {
        document.getElementById('displayText1').innerText = 'No text available. Please add new text.';
        document.getElementById('displayText2').innerText = '';
        document.getElementById('displayText3').innerText = '';
        document.getElementById('displayText4').innerText = '';


    }
}

function deleteCurrentText() {
    if (currentTextIndex >= 0 && currentTextIndex < data.lines.length) {
        data.lines.splice(currentTextIndex, 1);
        saveData();
        document.getElementById('displayText1').innerText = 'Text deleted. Fetch another text.';
        document.getElementById('displayText2').innerText = '';
        currentTextIndex = -1;
    } else {
        alert('No text to delete.');
    }
}

function showAddTextForm() {
    document.getElementById('addTextForm').style.display = 'flex';
}

function closeAddTextForm() {
    document.getElementById('addTextForm').style.display = 'none';
}

function addNewText() {
    const newQuestion = document.getElementById('newQuestionInput').value.trim();
    const newExplanation = document.getElementById('newExplanationInput').value.trim();
    if (newQuestion && newExplanation) {
        data.lines.push({ question: newQuestion, explanation: newExplanation });
        document.getElementById('newQuestionInput').value = '';
        document.getElementById('newExplanationInput').value = '';
        closeAddTextForm();
        saveData();
        alert('New text added successfully.');
    } else {
        alert('Please enter both a question and an explanation.');
    }
}

function saveData() {
    fetch('data.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonData => {
        console.log('Data saved:', jsonData);
    })
    .catch(error => console.error('Error saving data:', error));
}





