let data = { lines: [] };
let currentTextIndex = -1;
const urlData = "https://getpantry.cloud/apiv1/pantry/a1edfe85-a3c4-44fe-807d-6717b6738152/basket/INTERVIEW PREPARATION APP OFFICIAL JSON"


function showJustEditedQuestion() {

    if (localStorage.getItem('savedQuestion')) {

        let savedQuestion = localStorage.getItem('savedQuestion');

        fetch(urlData)

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


/* function goToFetchOrHome() {

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

} */


/* EDIT THIS FUNCTION TO SELECT YES OR NOT TO EDITTING */

/* 
    Make for this question to add a new atribute to the object

    ****** ALSO *******

    Use the same function and do the same but for topic to choose between candidate,
    interviewe and stuff, depending on the selected change the background of the question


*/
function handleSelection() {
    let dropdown = document.getElementById("dropdown");
    let selectedValue = dropdown.value;
    let resultText;

    if (selectedValue) {
        resultText = `You selected: ${selectedValue}`;
    } else {
        resultText = "No option selected";
    }

    document.getElementById("result").innerText = resultText;
    console.log(resultText);
}

// Initialize the default selection result on page load
document.addEventListener("DOMContentLoaded", function() {
    handleSelection();
});





/* FETCH THE INITIAL DATA FROM "DATA.JSON" DOCUMENT*/

fetch(urlData)

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
    fetch(urlData, {
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


    /* 
    
    1. Get "displayText1.value" (QUESTION)
    2. Si: question.value !== "":
            A: entonces buscar la pregunta en el array
            B: borrar el objeto entero de esa pregunta.
            C: entonces actualizar html con la pregunta al siguiente disponible (fetch random question)
   
   
   3. Sino: alert('No hay texto para eliminar.')

    */













    /* chatGPT FUNCTION GENERATED */

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