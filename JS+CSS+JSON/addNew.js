let currentUrl = window.location.href;
const urlData = "https://getpantry.cloud/apiv1/pantry/a1edfe85-a3c4-44fe-807d-6717b6738152/basket/INTERVIEW PREPARATION APP OFFICIAL JSON";
let dataStoredOnline;

fetchData();

function fetchData() {
    fetch(urlData)
        .then(response => response.json())
        .then(data => {
            dataStoredOnline = data;
            console.log("DATA FROM FETCHDATA FUNCTION");
            console.log(dataStoredOnline);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to checkbox
    document.getElementById('checkboxEdit').addEventListener('change', handleSelection);

    // Add event listeners to radio buttons
    const radioButtons = document.querySelectorAll('input[name="topic"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', handleSelection);
    });

    document.getElementById("addNewQuestion").addEventListener("click", addNewData);
});

function handleSelection() {
    const topic = document.querySelector('input[name="topic"]:checked')?.value;
    const edition = document.getElementById('checkboxEdit').checked;
    colorAssociation(topic, edition);
}

function getBorderColorForTopic(topic) {
    switch (topic) {
        case 'Candidate':
            return 'rgb(121, 225, 98)'; // Soft pastel green
        case 'Advice':
            return '#ffcc80'; // Soft pastel orange-yellow
        case 'Encouragement':
            return 'rgb(204, 153, 255)'; // Soft pastel purple
        default:
            return '#66D9FF'; // Soft pastel blue
    }
}

function colorAssociation(topic, edition) {
    let questionSection = document.querySelector(".questionSection");
    questionSection.classList.remove('interviewer-bg', 'candidate-bg', 'advice-bg', 'encouragment-bg');

    // Determine the border color based on the topic
    const borderColor = getBorderColorForTopic(topic);
    questionSection.style.border = `3px solid ${borderColor}`;

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

    let questionAdditionals = document.getElementById("question-additionals");
    questionAdditionals.classList.remove('questionToEdit', 'questionNoToEdit');
    questionAdditionals.classList.add(edition ? 'questionToEdit' : 'questionNoToEdit');

    let svgElement = document.querySelector('svg');
    if (svgElement) {
        svgElement.style.fill = edition ? 'rgb(255, 85, 55)' : '#333';
    }
}

function addNewData() {
    console.log("submitButton read");

    const question = document.getElementById('displayText1').innerHTML.trim(); // Store HTML content
    const explanation = document.getElementById('displayText2').innerHTML.trim(); // Store HTML content
    const answer = document.getElementById('displayText3').innerHTML.trim(); // Store HTML content
    const example = document.getElementById('displayText4').innerHTML.trim(); // Store HTML content

    const topic = document.querySelector('input[name="topic"]:checked')?.value;
    const edition = document.getElementById('checkboxEdit').checked;

    if (!question || !topic) {
        alert('Please fill out the question and select a topic.');
        return;
    }

    const borderColor = getBorderColorForTopic(topic);

    const newData = {
        question: question,
        topic: topic,
        edition: edition,
        explanation: explanation,
        answer: answer,
        example: example,
        borderColor: borderColor // Include border color in the data
    };

    console.log("TEXTAREA OBJECT");
    console.log(newData);

    localStorage.setItem("savedQuestion", question);

    console.log("data stored online before updating new one");
    console.log(dataStoredOnline);

    dataStoredOnline.lines.push(newData);
    let dataToUpload = dataStoredOnline;

    console.log("DATA ABOUT TO BE UPDATED");
    console.log(dataStoredOnline);

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

        window.location.href = "fetch.html";
    })
    .catch(error => console.error('Error adding new data:', error));
}
