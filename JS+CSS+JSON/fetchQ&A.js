let data = { lines: [] };
let currentTextIndex = -1;



let currentUrl = window.location.href;
const urlData = "https://getpantry.cloud/apiv1/pantry/a1edfe85-a3c4-44fe-807d-6717b6738152/basket/INTERVIEW PREPARATION APP OFFICIAL JSON"
let dataStoredOnline;

let newData;
let savedQuestion;
let savedData = null;
let matchedObject;
let foundLine;






const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');
const fetchButton = document.getElementById('fetchButton');
const deleteButton = document.getElementById('deleteButton');
const checkboxes = document.getElementById('checkboxes');
const formatButtons = document.querySelector('.format-buttons');
const displayText1 = document.getElementById('displayText1');
const displayText2 = document.getElementById('displayText2');
const displayText3 = document.getElementById('displayText3');
const displayText4 = document.getElementById('displayText4');
const checkboxEdit = document.getElementById('checkboxEdit');


let isEditing;


function initDisplay() {
    if (checkboxEdit.checked) {
        displayText1.contentEditable = 'true';
        displayText2.contentEditable = 'true';
        displayText3.contentEditable = 'true';
        displayText4.contentEditable = 'true';
    } else {
        displayText1.contentEditable = 'false';
        displayText2.contentEditable = 'false';
        displayText3.contentEditable = 'false';
        displayText4.contentEditable = 'false';
    }
    // Ensure the buttons are initially hidden
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
}


// Reset the layout and styles of checkboxes
function resetCheckboxes() {
    const labels = checkboxes.querySelectorAll('label');
    labels.forEach(label => {
        label.style.width = 'auto'; // Reset width to auto for proper wrapping
        label.style.display = 'inline-block'; // Ensure labels are inline-block
    });
}

// Toggle edit modelet originalContent1, originalContent2, originalContent3, originalContent4;

function toggleEditing(isEditing) {
    editButton.style.display = isEditing ? 'none' : 'inline-block';
    deleteButton.style.display = isEditing ? 'none' : 'inline-block';
    checkboxes.style.display = isEditing ? 'none' : 'flex'; // Set back to flex
    formatButtons.style.display = isEditing ? 'block' : 'none';
    fetchButton.style.display = isEditing ? 'none' : 'inline-block'; // Hide fetchButton when editing

    // Show/Hide save and cancel buttons based on editing state
    saveButton.style.display = isEditing ? 'inline-block' : 'none';
    cancelButton.style.display = isEditing ? 'inline-block' : 'none';

    // Toggle edit mode on text elements
    const contentEditable = isEditing ? 'true' : 'false';
    displayText1.contentEditable = contentEditable;
    displayText2.contentEditable = contentEditable;
    displayText3.contentEditable = contentEditable;
    displayText4.contentEditable = contentEditable;

    // Ensure highlighting and formatting can be applied during editing
    if (isEditing) {
        document.execCommand('defaultParagraphSeparator', false, 'p');

        // Save the original content
        originalContent1 = displayText1.innerHTML;
        originalContent2 = displayText2.innerHTML;
        originalContent3 = displayText3.innerHTML;
        originalContent4 = displayText4.innerHTML;
    }
}


function highlightText(color) {
    if (isEditing) {
        document.execCommand('hiliteColor', false, color);
    }
}

function removeHighlight() {
    if (isEditing) {
        document.execCommand('removeFormat', false, null);
    }
}

function colorAssociation(topic, edition) {
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
    questionAdditionals.classList.add(edition ? 'questionToEdit' : 'questionNoToEdit');

    // Update the SVG color based on the checkbox
    let svgElement = document.querySelector('svg'); // Replace with the actual SVG selector
    if (svgElement) {
        svgElement.style.fill = edition ? 'rgb(255, 85, 55)' : '#333'; // Example colors
    }
}

// Updated function to store styling and save data
function addNewData() {
    console.log("submitButton read");

/*     if (foundLine.edition = true) {
        foundLine.edition = false;
    }
 */
    // Retrieve data from text areas

    savedQuestion = document.getElementById('displayText1').innerHTML;
    console.log(savedQuestion)
    localStorage.setItem("savedQuestion", savedQuestion);

    // Create new data object including styled content
    const newData = {
        question: document.getElementById('displayText1').innerHTML,
        explanation: document.getElementById('displayText2').innerHTML,
        "topic": foundLine.topic,
        "edition": foundLine.edition,
        answer: document.getElementById('displayText3').innerHTML,
        example: document.getElementById('displayText4').innerHTML
    };

    console.log("NEW DATA");
    console.log(newData);

    savedData.lines = savedData.lines.filter(line => line.question !== foundLine.question);

    console.log("data stored online before updating new one");
    console.log(savedData);

    savedData.lines.push(newData);
    let dataToUpload = savedData;

    console.log("new DATA ABOUT TO BE UPDATED");
    console.log(dataToUpload);

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
        document.getElementById('displayText1').value = "";
        document.getElementById('displayText2').value = "";
        document.getElementById('displayText3').value = "";
        document.getElementById('displayText4').value = "";

        localStorage.setItem('savedQuestion', savedQuestion);
        
    })
    .catch(error => console.error('Error adding new data:', error));
}

// Updated function to display saved question with styling
function showJustEditedQuestion() {
    if (localStorage.getItem('savedQuestion')) {
        savedQuestion = localStorage.getItem('savedQuestion');
        console.log("showjusteditedquestion: " + savedQuestion);

        fetch(urlData)
        .then(response => response.json())
        .then(data => {
            // If you want to find a specific question
            foundLine = data.lines.find(line => line.question === savedQuestion);
            console.log(foundLine)

            if (foundLine) {
                document.getElementById('displayText1').innerHTML = foundLine.question;
                document.getElementById('displayText2').innerHTML = foundLine.explanation;

                document.querySelectorAll('input[name="topic"]').forEach(radio => {
                    if (radio.value === foundLine.topic) {
                        radio.checked = true;
                    }
                });
                document.getElementById('checkboxEdit').checked = foundLine.edition === true;

                document.getElementById('displayText3').innerHTML = foundLine.answer;
                document.getElementById('displayText4').innerHTML = foundLine.example;

                colorAssociation(foundLine.topic, foundLine.edition);
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
    } else {
        fetchRandomText()
    }
}
function handleSelection() {
    console.log("-------------------");

    // Find the specific object in savedData that contains the fetched question
    let matchedObject = savedData.lines.find(obj => obj.question === savedQuestion);

    if (matchedObject) {
        console.log("Found the matched object:", matchedObject);
    } else {
        console.log("No matched object found.");
        return; // Exit if no matched object is found
    }

    // Get the selected radio button value
    let radios = document.querySelectorAll('input[name="topic"]:checked');
    let topic = radios.length > 0 ? radios[0].value : 'Interviewer';

    // Get the checkbox value
    let checkboxEdit = document.getElementById("checkboxEdit");
    let edition = checkboxEdit.checked; // true or false

    // Change background color and update SVG based on the selected values
    colorAssociation(topic, edition);

    // Create new data object
    let newData = {
        question: matchedObject.question,
        explanation: matchedObject.explanation,
        topic: topic,
        edition: edition, // true or false
        answer: matchedObject.answer,
        example: matchedObject.example
    };

    console.log('New data (TOPIC, EDITION AND REPRESENTATION) added successfully!');
    console.log(newData);

    // Remove the previous object with the same question from the array
    savedData.lines = savedData.lines.filter(obj => obj.question !== matchedObject.question);

    // Add the new data to the array
    savedData.lines.push(newData);
    console.log("Whole object about to send to JSON with the new info");
    console.log(savedData);

    // Send the updated data to the server
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








/* SHOW QUESTION AND ANSWER INSIDE THE SCROLLABLE AREA */

function fetchRandomText() {
    document.getElementById('editableText').scrollTop = 0;

    // Filter questions based on selected checkboxes
    const topicCheckboxes = Array.from(document.querySelectorAll('#checkboxes input[type="checkbox"]:not([value="true"])'));
    const isEditingChecked = document.querySelector('#checkboxes input[value="true"]').checked;

    let filteredLines = data.lines.filter(item => {
        const matchesTopic = topicCheckboxes.length === 0 || topicCheckboxes.some(checkbox => checkbox.checked && item.topic === checkbox.value);
        const matchesEditing = !isEditingChecked || (isEditingChecked && (item.edition === true || item.edition === "true"));
        return matchesTopic && matchesEditing;
    });

    if (filteredLines.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredLines.length);
        const selectedItem = filteredLines[randomIndex];

        savedQuestion = selectedItem.question;
        foundLine = selectedItem;
        console.log('Selected item:', selectedItem);
        console.log(savedQuestion);
        localStorage.setItem('savedQuestion', savedQuestion);

        document.getElementById('displayText1').innerHTML = selectedItem.question;
        document.getElementById('displayText2').innerHTML = selectedItem.explanation;
        document.getElementById('displayText3').innerHTML = selectedItem.answer;
        document.getElementById('displayText4').innerHTML = selectedItem.example;

        // Automatically select the corresponding radio button
        let radios = document.querySelectorAll('input[name="topic"]');
        radios.forEach(radio => {
            if (radio.value === selectedItem.topic) {
                radio.checked = true;
            }
        });

        document.getElementById('checkboxEdit').checked = selectedItem.edition === true;

        colorAssociation(selectedItem.topic, selectedItem.edition)
    } else {
        document.getElementById('displayText1').innerText = 'No text available based on the selected filters.';
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



                localStorage.removeItem("savedQuestion")
                window.location.href = currentUrl;
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





document.getElementById('confirm-question-to-delete').addEventListener('click', deleteCurrentText);
/* document.getElementById("editBtn").addEventListener("click", editBtnShowModal);
 */
document.getElementById('fetchButton').addEventListener('click' || "enter", fetchRandomText);
/* document.getElementById('editBtn').addEventListener('click', goToEdit); */

/* goToFetchOrHome(); */


// Add event listeners to radio buttons and checkbox to update the UI in real time
/* document.querySelectorAll('input[name="topic"]').forEach(radio => {
    radio.addEventListener('change', handleSelection);
});
document.getElementById('checkboxEdit').addEventListener('change', handleSelection);
 */
// Initial call to set the UI based on default values

// Handle the edit button click
editButton.addEventListener('click', function () {
    console.log("edit btn click")
    toggleEditing(true);
});

// Handle the save button click
saveButton.addEventListener('click', function () {
    toggleEditing(false);

    addNewData();
    // Reset the checkboxes layout and styles


    console.log("saving styled data")
    resetCheckboxes();
    // Implement saving logic here if needed
});

// Handle the cancel button click

cancelButton.addEventListener('click', function () {
    toggleEditing(false);
    // Reset the checkboxes layout and styles
    resetCheckboxes();
    
    // Revert to the original content
    displayText1.innerHTML = originalContent1;
    displayText2.innerHTML = originalContent2;
    displayText3.innerHTML = originalContent3;
    displayText4.innerHTML = originalContent4;
});



document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to checkbox
    document.getElementById('checkboxEdit').addEventListener('change', handleSelection);
});

document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to checkbox
    document.getElementById('checkboxEdit').addEventListener('change', handleSelection);

    // Add event listeners to radio buttons
    const radioButtons = document.querySelectorAll('input[name="topic"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', handleSelection);
    });
});



showJustEditedQuestion();
// Initialize the display
initDisplay();

handleSelection();