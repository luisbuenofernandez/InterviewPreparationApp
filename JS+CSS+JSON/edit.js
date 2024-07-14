const urlData = "https://getpantry.cloud/apiv1/pantry/a1edfe85-a3c4-44fe-807d-6717b6738152/basket/INTERVIEW PREPARATION APP OFFICIAL JSON"


function goToFetchOrHome() {

    if (localStorage.getItem('savedQuestion')) {

        const backBtn = document.createElement('a');
        backBtn.href = `fetchQ&A.html`;
        backBtn.textContent = "Back";
        document.getElementById('goBackOrGoHome').appendChild(backBtn);

    } else {

        const homeBtn = document.createElement('a');
        homeBtn.href = `index.html`;
        homeBtn.textContent = "Home";
        document.getElementById('goBackOrGoHome').appendChild(homeBtn);

    }




    if (localStorage.getItem('savedQuestion')) {


        const savedQuestion = localStorage.getItem('savedQuestion');



        /* The question only gets deleted from "fetchQ&A.html" 
            
        al cargar el documento nuevamente*/



        fetch(urlData)
            .then(response => response.json())
            .then(data => {

                // If you want to find a specific question
                const foundLine = data.lines.find(line => line.question === savedQuestion);

                if (foundLine) {

                    /* GET TEXTAREAS FROM "EDIT.HTML" */
                    document.getElementById('question').value = foundLine.question;
                    document.getElementById('explanation').value = foundLine.explanation;
                    document.getElementById('example').value = foundLine.example;
                    document.getElementById('answer').value = foundLine.answer;

                }   /* IF STATEMENT CLOSING TAG */
            })
            .catch(error => console.error('Error fetching JSON:', error));


    }   /* IF STATEMENT CLOSING TAG */




}   /* FUNCTION CLOSING TAG */


goToFetchOrHome()






function addNewData() {
    

    const newData = {

        question: document.getElementById('question').value,
        explanation: document.getElementById('explanation').value,
        answer: document.getElementById('example').value,
        example: document.getElementById('answer').value
    };
    
    
    
    // Function to add new data to the endpoint (PUT request to replace entire data)
        fetch(urlData, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        })
            .then(response => response.json())
            .then(data => console.log('Data added successfully:', data))
            .catch(error => console.error('Error adding data:', error));





             document.getElementById('question').value = ""
         document.getElementById('explanation').value = ""
         document.getElementById('example').value = ""
         document.getElementById('answer').value = ""



         fetch(urlData)
            .then(response => response.json())
            .then(data => {

                console.log(data)

            }
        )

}



document.getElementById("submitButton").addEventListener("click", addNewData)