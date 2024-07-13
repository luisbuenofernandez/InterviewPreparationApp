


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



        fetch('https://api.npoint.io/3ba28e4574ca6a967200')
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