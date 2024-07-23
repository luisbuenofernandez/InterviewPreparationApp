let data = { lines: [] };
let currentTextIndex = -1;



let currentUrl = window.location.href;
const urlData = "https://getpantry.cloud/apiv1/pantry/a1edfe85-a3c4-44fe-807d-6717b6738152/basket/INTERVIEW PREPARATION APP OFFICIAL JSON"
let dataStoredOnline;

let newData;
let savedQuestion;
let savedData = null;
let matchedObject;





function addNewData() {

    console.log("submitButton read")

    savedData.lines = savedData.lines.filter(line => line.question !== foundLine.question);
    

    // Retrieve data from text areas
    const question = document.getElementById('edit-question').value;
    const explanation = document.getElementById('edit-explanation').value;
    const answer = document.getElementById('edit-answer').value;
    const example = document.getElementById('edit-example').value;

    savedQuestion = question;
    localStorage.setItem("savedQuestion", savedQuestion);

    // Create new data object
    const newData = {
        question: question,
        explanation: explanation,
        answer: answer,
        example: example
    };

    console.log("NEW DATA")
    
    console.log(newData)



    console.log("data stored online before updating new one")
    console.log(savedData)



    savedData.lines.push(newData);
    let dataToUpload = savedData;


    console.log("new DATA ABOUT TO BE UPDATED")
    console.log(dataToUpload    );









    // POST request to add new data
    fetch(urlData, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpload),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add new data');
            }
            // Wait 3 seconds before fetching and displaying updated data


            console.log("CLEAR TEXTAREA");
            document.getElementById('edit-question').value = ""
            document.getElementById('edit-explanation').value = ""
            document.getElementById('edit-answer').value = ""
            document.getElementById('edit-example').value = ""

            alert('New data added successfully!');

            /* window.location.href = "index.html" */
            localStorage.setItem('savedQuestion', savedQuestion);
            window.location.href = currentUrl;


        })
        .catch(error => console.error('Error adding new data:', error));

}





 function editBtnShowModal() {

    current_question = localStorage.getItem("savedQuestion")

    console.log("EDIT BTN FUNCTION START")

        
        console.log("current_question" + savedQuestion)
        

            // If you want to find a specific question
            foundLine = savedData.lines.find(line => line.question === savedQuestion);
            
            console.log("found object: " + foundLine.question)
            console.log("found object: " + foundLine.explanation)
            console.log("found object: " + foundLine.answer)
            console.log("found object: " + foundLine.example)

                document.getElementById('edit-question').value = foundLine.question;
                document.getElementById('edit-explanation').value = foundLine.explanation;
                document.getElementById('edit-example').value = foundLine.example;
                document.getElementById('edit-answer').value = foundLine.answer;


                /* Delete the current object after showin it in the model */
                

                /* addNewData() */
                document.getElementById("submitButton").addEventListener("click", addNewData);

    
    
} 


function showJustEditedQuestion() {

    if (localStorage.getItem('savedQuestion')) {

        savedQuestion = localStorage.getItem('savedQuestion');
        console.log("shiowjusteditedquestion: " + savedQuestion)

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

                        console.log("  Topic:" + foundLine.topic)
                        console.log("  EditionStatus:" + foundLine.edition)
                        console.log("  Representation:" + foundLine.representation)
                    }



                    document.getElementById('displayText3').innerHTML = foundLine.answer;
                    document.getElementById('displayText4').innerHTML = foundLine.example;

                    document.getElementById("editBtn").addEventListener("click", editBtnShowModal);

                    
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
    console.log("-------------------");

    // Find the specific object in savedData that contains the fetched question
    matchedObject = savedData.lines.find(obj => obj.question === savedQuestion);

    if (matchedObject) {
        console.log("Found the matched object:", matchedObject);
    } else {
        console.log("No matched object found.");
    }

    // Get the selected radio button value
    let radios = document.querySelectorAll('input[name="topic"]:checked');
    let topic = radios.length > 0 ? radios[0].value : 'Interviewer';

    // Get the checkbox value
    let checkboxEdit = document.getElementById("checkboxEdit");
    let edition = checkboxEdit.checked ? "yes" : "no";

    // Change background color based on the selected value
    let questionSection = document.querySelector(".questionSection");
    questionSection.classList.remove('interviewer-bg', 'candidate-bg', 'advice-bg', 'encouragment-bg');
    switch (topic) {
        case 'Candidate':
            questionSection.classList.add('candidate-bg');
            break;
        case 'Advice':
            questionSection.classList.add('advice-bg');
            break;
        case 'Encouragement':
            questionSection.classList.add('encouragment-bg');
            break;
        default:
            questionSection.classList.add('interviewer-bg');
            break;
    }

    // Update the question additionals class based on the checkbox
    let questionAdditionals = document.getElementById("question-additionals");
    questionAdditionals.classList.remove('questionToEdit', 'questionNoToEdit');
    if (edition === "yes") {
        questionAdditionals.classList.add('questionToEdit');
    } else {
        questionAdditionals.classList.add('questionNoToEdit');
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
            console.log('New data (TOPIC, EDITION AND REPRESENTATION) added successfully to JSON ONLINE!');
        })
        .catch(error => console.error('Error adding new data:', error));
}
// Initialize the default selection result on page load
/* document.addEventListener("DOMContentLoaded", function () {
    handleSelection();
});
 */




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
    
    console.log("Button fetch works");

    document.getElementById('editableText').scrollTop = 0;
    
    // Filter questions based on selected checkboxes
    const topicCheckboxes = Array.from(document.querySelectorAll('#checkboxes input[type="checkbox"]:not([value="yes"])'));
    const isEditingChecked = document.querySelector('#checkboxes input[value="yes"]').checked;
    
    let filteredLines = data.lines.filter(item => {
        const matchesTopic = topicCheckboxes.length === 0 || topicCheckboxes.some(checkbox => checkbox.checked && item.topic === checkbox.value);
        const matchesEditing = !isEditingChecked || (isEditingChecked && item.edition === 'yes');
        return matchesTopic && matchesEditing;
    });
    
    if (filteredLines.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredLines.length);
        const selectedItem = filteredLines[randomIndex];
    
        savedQuestion = selectedItem.question;
        console.log(savedQuestion);
        localStorage.setItem('savedQuestion', savedQuestion);
    
        document.getElementById('displayText1').innerText = selectedItem.question;
        document.getElementById('displayText2').innerText = selectedItem.explanation;
        document.getElementById('displayText3').innerText = selectedItem.answer;
        document.getElementById('displayText4').innerText = selectedItem.example;
    
        // Automatically select the corresponding radio button
        let radios = document.querySelectorAll('input[name="topic"]');
        radios.forEach(radio => {
            if (radio.value === selectedItem.topic) {
                radio.checked = true;
            }
        });
    
        // Automatically check the checkbox based on the `edition` key
        let checkboxEdit = document.getElementById("checkboxEdit");
        checkboxEdit.checked = selectedItem.edition === 'yes';
    
        // Change background color based on the selected value
        let questionSection = document.querySelector(".questionSection");
        questionSection.classList.remove('interviewer-bg', 'candidate-bg', 'advice-bg', 'encouragment-bg');
        switch (selectedItem.topic) {
            case 'Candidate':
                questionSection.classList.add('candidate-bg');
                break;
            case 'Advice':
                questionSection.classList.add('advice-bg');
                break;
            case 'Encouragement':
                questionSection.classList.add('encouragment-bg');
                break;
            default:
                questionSection.classList.add('interviewer-bg');
                break;
        }
    
        // Update the question additionals class based on the checkbox
        document.getElementById("question-additionals").classList.remove('questionToEdit', 'questionNoToEdit');
        if (checkboxEdit.checked) {
            document.getElementById("question-additionals").classList.add('questionToEdit');
        } else {
            document.getElementById("question-additionals").classList.add('questionNoToEdit');
        }
    
    } else {
        document.getElementById('displayText1').innerText = 'No text available based on the selected filters.';
        document.getElementById('displayText2').innerText = '';
        document.getElementById('displayText3').innerText = '';
        document.getElementById('displayText4').innerText = '';
    }
    
    handleSelection();
    
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
    // Find the specific object in savedData that contains the fetched question
    let matchedObject = savedData.lines.find(obj => obj.question === savedQuestion);

    if (matchedObject) {
        console.log("Found the matched object:", matchedObject);

        // This line deletes the previous object from the array
        savedData.lines = savedData.lines.filter(obj => obj !== matchedObject);
        console.log("Object deleted. Remaining data:", savedData.lines);

        // Upload the modified data online
        fetch(urlData, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(savedData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update data');
                }
                alert('Data deleted successfully online!');
                fetchRandomText(); // Call fetchRandomText after successful deletion
            })
            .catch(error => console.error('Error updating data:', error));
    } else {
        console.log("No matched object found to delete.");
    }
}



/* THIS FUNCTION GOES TO "EDIT.HTML" AFTER SAVING THE QUESTION TO SHOW IN THE LOCAL STORAGE */

/* function goToEdit() {
    localStorage.setItem('savedQuestion', savedQuestion);
    window.location.href = 'edit.html';
}
 */





document.getElementById('deleteButton').addEventListener('click', deleteCurrentText);
document.getElementById("editBtn").addEventListener("click", editBtnShowModal);

document.getElementById('fetchButton').addEventListener('click' || "enter", fetchRandomText);
/* document.getElementById('editBtn').addEventListener('click', goToEdit); */

showJustEditedQuestion();
/* goToFetchOrHome(); */


// Add event listeners to radio buttons and checkbox to update the UI in real time
document.querySelectorAll('input[name="topic"]').forEach(radio => {
    radio.addEventListener('change', handleSelection);
});
document.getElementById('checkboxEdit').addEventListener('change', handleSelection);

// Initial call to set the UI based on default values
handleSelection();
