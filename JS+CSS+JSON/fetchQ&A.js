let data = { lines: [] };
let currentTextIndex = -1;

function showJustEditedQuestion() {

    if (localStorage.getItem('savedQuestion')) {

        let savedQuestion = localStorage.getItem('savedQuestion');

        fetch('JS+CSS+JSON/data.json')

            .then(response => response.json())
            .then(data => {

                // If you want to find a specific question
                const foundLine = data.lines.find(line => line.question === savedQuestion);

                if (foundLine) {
                    /* GET TEXTAREAS FROM "EDIT.HTML" */
                    document.getElementById('displayText1').innerHTML = foundLine.question;
                    document.getElementById('displayText2').innerHTML = foundLine.explanation;
                    document.getElementById('displayText3').innerHTML = foundLine.answer;
                    document.getElementById('displayText4').innerHTML = foundLine.example;

                    localStorage.removeItem('savedQuestion');
                }
            })
            .catch(error => console.error('Error fetching JSON:', error));

    }

}


function goToFetchOrHome() {

    if (localStorage.getItem('savedQuestion')) {
        console.log(localStorage.getItem('savedQuestion'))

        const backBtn = document.createElement('a');
        backBtn.href = `showAll.html`;
        backBtn.textContent = "Back";
        document.getElementById('goBackOrGoHome').appendChild(backBtn);

    } else {
        console.log("not question saved")

        const homeBtn = document.createElement('a');
        homeBtn.href = `index.html`;
        homeBtn.textContent = "Home";
        document.getElementById('goBackOrGoHome').appendChild(homeBtn);

    }

}


/* FETCH THE INITIAL DATA FROM "DATA.JSON" DOCUMENT*/

fetch('JS+CSS+JSON/data.json')

    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log('Data loaded:', data);
    })
    .catch(error => console.error('Error loading data:', error));




/* SHOW QUESTION AND ANSWER INSIDE THE SCROLLABLE AREA */

function fetchRandomText() {
    if (data.lines.length > 0) {
        currentTextIndex = Math.floor(Math.random() * data.lines.length);
        savedQuestion = data.lines[currentTextIndex].question;
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




/* THIS FUNCTION ACTUALIZES THE JSON AFTER EDITING OR DELETING */

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



/* DELETES CURRENT QUESTION AND ANSWER */

function deleteCurrentText() {
    if (currentTextIndex >= 0 && currentTextIndex < data.lines.length) {
        data.lines.splice(currentTextIndex, 1);
        saveData();
        document.getElementById('displayText1').innerText = 'Text deleted. Fetch another text.';
        document.getElementById('displayText2').innerText = '-';
        document.getElementById('displayText3').innerText = '-';
        document.getElementById('displayText4').innerText = '-';

        currentTextIndex = -1;
    } else {
        alert('No text to delete.');
    }
}



/* THIS FUNCTION GOES TO "EDIT.HTML" AFTER SAVING THE QUESTION TO SHOW IN THE LOCAL STORAGE */

function goToEdit() {
    localStorage.setItem('savedQuestion', savedQuestion);
    window.location.href = 'edit.html';
}





document.getElementById('fetchButton').addEventListener('click', fetchRandomText);
document.getElementById('deleteButton').addEventListener('click', deleteCurrentText);
document.getElementById('editBtn').addEventListener('click', goToEdit);

showJustEditedQuestion();
goToFetchOrHome();