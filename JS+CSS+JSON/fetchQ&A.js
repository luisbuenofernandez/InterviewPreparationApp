let data = { lines: [] };
let currentTextIndex = -1;
const urlData = "https://getpantry.cloud/apiv1/pantry/a1edfe85-a3c4-44fe-807d-6717b6738152/basket/INTERVIEW PREPARATION APP OFFICIAL JSON"
let newData;
let savedQuestion;
let savedData = null;

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



                    if (foundLine.topic || foundLine.edition || foundLine.representation) {
                        document.getElementById('dropdown_topic').value = foundLine.topic
                        document.getElementById('dropdown_edition').value = foundLine.edition
                        document.getElementById('dropdown_representation').value = foundLine.representation
            
                        console.log("  Topic:"  +  foundLine.topic)
                        console.log("  EditionStatus:"  +  foundLine.edition)
                        console.log("  Representation:"  +  foundLine.representation)
                    }
            


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


*/function handleSelection() {
    console.log("-------------------")

    // Find the specific object in savedData that contains the fetched question
    const matchedObject = savedData.lines.find(obj => obj.question === savedQuestion);
    
    if (matchedObject) {
        console.log("Found the matched object:", matchedObject);
    } else {
        console.log("No matched object found.");
    }

    let dropdownTopic = document.getElementById("dropdown_topic");
    let topic = dropdownTopic.value;

    let dropdownEdition = document.getElementById("dropdown_edition");
    let edition = dropdownEdition.value;

    let dropdownRepresentation = document.getElementById("dropdown_representation");
    let representation = dropdownRepresentation.value;

    // Change background color based on the selected value
    let questionSection = document.querySelector(".questionSection");
    questionSection.classList.remove('interviewer-bg', 'candidate-bg', 'advice-bg');
    switch (topic) {
        case 'Interviewer':
            questionSection.classList.add('interviewer-bg');
            break;
        case 'Candidate':
            questionSection.classList.add('candidate-bg');
            break;
        case 'Advice':
            questionSection.classList.add('advice-bg');
            break;
        default:
            break;
    }

    // Create new data object
    let newData = {
        question: matchedObject.question,
        explanation: matchedObject.explanation,
        topic: topic,
        edition: edition,
        representation: representation,
        answer: matchedObject.answer,
        example: matchedObject.example
    };

    console.log('New data (TOPIC, EDITION AND REPRESENTATION) added successfully!');
    console.log(newData);

    // This line deletes the previous object with 4 keys from the array
    savedData.lines = savedData.lines.filter(obj => obj !== matchedObject);

    savedData.lines.push(newData);
    console.log("Whole object about to send to JSON with the new info");
    console.log(savedData);

    fetch(urlData, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add new data');
        }
        alert('New data (TOPIC, EDITION AND REPRESENTATION) added successfully to JSON ONLINE!');
    })
    .catch(error => console.error('Error adding new data:', error));
}

// Initialize the default selection result on page load
document.addEventListener("DOMContentLoaded", function () {
    handleSelection();
});





/* FETCH THE INITIAL DATA FROM "DATA.JSON" DOCUMENT*/

fetch(urlData)
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        console.log('Data loaded:', data);

        // Save the data to savedData for later manipulation
        savedData = data;

        // Correctly log the savedData object
        console.log("saved data:", savedData);
    })
    .catch(error => console.error('Error loading data:', error));



/*  THIS PART TAKES DE TARA IN THE DROPDOWNS FROM THE HTML AND UPLOAD THE JSON ONLINE*/

     /*    function saveAdditionalData () {

            console.log("FUNCTIN SAVE ADDITIONAL DATA GOES IN")
            console.log(savedData)


            
            const topic = document.getElementById('dropdown_topic').value;
        const edition = document.getElementById('dropdown_edition').value;
        const representation = document.getElementById('dropdown_representation').value;

        // Create new data object
        newData = {
            question: question,
            explanation: explanation,

            topic: topic,
            edition: edition,
            representation: representation,

            answer: answer,
            example: example
        };


        savedData.lines.push(newData);



        fetch(urlData, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(savedData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add new data');
                }
                // Wait 3 seconds before fetching and displaying updated data
    
    
                
    
    
    
    
            })
            .catch(error => console.error('Error adding new data:', error));
    
    
        } */

/* SHOW QUESTION AND ANSWER INSIDE THE SCROLLABLE AREA */

function fetchRandomText() {


    if (data.lines.length > 0) {
        currentTextIndex = Math.floor(Math.random() * data.lines.length);

        
        savedQuestion = data.lines[currentTextIndex].question;
        console.log(savedQuestion)
        
        const foundObject = savedData.lines.find(obj => obj.question === savedQuestion);    
        console.log("Found the matched object:", foundObject);
        

        document.getElementById('displayText1').innerText = foundObject.question;
        document.getElementById('displayText2').innerText = foundObject.explanation;
            
        document.getElementById('displayText3').innerText = foundObject.answer;
        document.getElementById('displayText4').innerText = foundObject.example;



        
    let dropdownTopic = document.getElementById("dropdown_topic");
    let topic = dropdownTopic.value;

    let dropdownEdition = document.getElementById("dropdown_edition");
    let edition = dropdownEdition.value;

    let dropdownRepresentation = document.getElementById("dropdown_representation");
    let representation = dropdownRepresentation.value;

    // Change background color based on the selected value
    
    
    
            document.getElementById('dropdown_topic').value = foundObject.topic
            document.getElementById('dropdown_edition').value = foundObject.edition
            document.getElementById('dropdown_representation').value = foundObject.representation

            console.log("  Topic:"  +  foundObject.topic)
            console.log("  EditionStatus:"  +  foundObject.edition)
            console.log("  Representation:"  +  foundObject.representation)
        

            
            let questionSection = document.querySelector(".questionSection");
            questionSection.classList.remove('interviewer-bg', 'candidate-bg', 'advice-bg');
            switch (topic) {
                case 'Interviewer':
                    questionSection.classList.add('interviewer-bg');
                    break;
                case 'Candidate':
                    questionSection.classList.add('candidate-bg');
                    break;
                case 'Advice':
                    questionSection.classList.add('advice-bg');
                    break;
                default:
                    break;
            }
            
            
            
            
            



/*         saveAdditionalData();
 */
        




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
        /* document.getElementById('displayText1').innerText = 'Text deleted. Fetch another text.';
        document.getElementById('displayText2').innerText = '-';
        document.getElementById('displayText3').innerText = '-';
        document.getElementById('displayText4').innerText = '-'; */

        currentTextIndex = -1;

        alert('Question deleted.')
        fetchRandomText();
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
/* goToFetchOrHome(); */