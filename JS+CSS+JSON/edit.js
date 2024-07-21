let currentUrl = window.location.href;
const urlData = "https://getpantry.cloud/apiv1/pantry/a1edfe85-a3c4-44fe-807d-6717b6738152/basket/INTERVIEW PREPARATION APP OFFICIAL JSON"
let dataStoredOnline;
let savedQuestion;
let foundLine;
let isEditing;


function fetchData() {
    fetch(urlData)
        .then(response => response.json())
        .then(data => {
            dataStoredOnline = data;
            console.log("DATA FROM FETCHDATA FUNCTION")
            console.log(dataStoredOnline);
        });
}






function addNewData() {

    console.log("submitButton read")

    fetchData()

    

    // Retrieve data from text areas
    const question = document.getElementById('edit-question').value;
    const explanation = document.getElementById('edit-explanation').value;
    const answer = document.getElementById('edit-answer').value;
    const example = document.getElementById('edit-example').value;

    console.log("edit-areas read from index.html")
    console.log(document.getElementById('edit-question').value)



    // Create new data object
    const newData = {
        question: question,
        explanation: explanation,
        answer: answer,
        example: example
    };

    console.log("TEXTAREA OBJECT")
    console.log(newData)

    localStorage.setItem("saved_object", newData)



    console.log("data stored online before updating new one")
    console.log(dataStoredOnline)



    dataStoredOnline.lines.push(newData);
    let dataToUpload = dataStoredOnline;


    console.log("DATA ABOUT TO BE UPDATED")
    console.log(dataStoredOnline);









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
            
            window.location.href = currentUrl;


        })
        .catch(error => console.error('Error adding new data:', error));

}


document.addEventListener("DOMContentLoaded", fetchData);


document.getElementById("submitButton").addEventListener("click", addNewData);