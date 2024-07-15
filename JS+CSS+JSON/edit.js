const urlData = "https://getpantry.cloud/apiv1/pantry/a1edfe85-a3c4-44fe-807d-6717b6738152/basket/INTERVIEW PREPARATION APP OFFICIAL JSON"
let dataStoredOnline;
let savedQuestion;
let foundLine;
let isEditing;


function goToFetchOrHome() {


    if (localStorage.getItem('savedQuestion')) {

        const backBtn = document.createElement('a');
        backBtn.href = `fetchQ&A.html`;
        backBtn.textContent = "Back";
        document.getElementById('goBackOrGoHome').appendChild(backBtn);


        savedQuestion = localStorage.getItem('savedQuestion');


    } else {

        const homeBtn = document.createElement('a');
        homeBtn.href = `index.html`;
        homeBtn.textContent = "Home";
        document.getElementById('goBackOrGoHome').appendChild(homeBtn);

    }









    /* The question only gets deleted from "fetchQ&A.html" 
        
    al cargar el documento nuevamente*/



    fetch(urlData)
        .then(response => response.json())
        .then(data => {

            /* STORE THE DATA TO BE USED LATER */
            dataStoredOnline = data; // Store the data for future use



            if (localStorage.getItem('savedQuestion')) {


                // If you want to find a specific question
                foundLine = data.lines.find(line => line.question === savedQuestion);

                if (foundLine) {
                    /*                     isEditing = true;
                     */
                    /* GET TEXTAREAS FROM "EDIT.HTML" */
                    document.getElementById('question').value = foundLine.question;
                    document.getElementById('explanation').value = foundLine.explanation;
                    document.getElementById('example').value = foundLine.example;
                    document.getElementById('answer').value = foundLine.answer;


                    dataStoredOnline.lines = dataStoredOnline.lines.filter(line => line.question !== savedQuestion);
                    console.log(dataStoredOnline.lines);


                    document.getElementById("submitButton").addEventListener("click", addNewData)

                    /* ----------------------------------------------------------------------- */

                    /* 
                    


                    USE THIS SECTION TO ADD DUE TO ALREADY HAVING 
                    THE QUESTION TO EDIT DISPLAYED IN THE TEXTAREAS
                    
                    
                    
                   
                1. Use a true or false variable to determine if you are editing a previous question or not.
                       let isEditing = true;  //  this value Change to false if you are adding a new question

                2. Call addNewData function.




                // FROM NOW ON YOULL NEED TO EDIT THE ADDNEWDATA FUNCTION 

                3. In addNewData function:
                
                        if: isEditing = true { 
                        
                            // find this object by the question in the array, the one currentl being displayed in the textareas, 
                            and delete it
                        
                            }



                            THIS NEXT PART IS ACTUALLY WHAT IS ALREADY DONE AND WORKING IN THE FUNCTION

                            // when click in submit, create the new object with the questions and answers just edited
                            // PUSH the existing question with the new data at the end of the array.
                             // UPLOAD the info into the JSON database.

 */






                    /* ----------------------------------------------------------------------- */

                }   /* IF STATEMENT CLOSING TAG */

            }   /* IF STATEMENT CLOSING TAG */

        })
        .catch(error => console.error('Error fetching JSON:', error));






}   /* FUNCTION CLOSING TAG */


goToFetchOrHome()






function addNewData() {


    /* 
    
    
        / FROM NOW ON YOULL NEED TO EDIT THE ADDNEWDATA FUNCTION 

        3. In addNewData function:
                
             if: isEditing = true { 
                        
                  // find this object by the question in the array, the one currentl being displayed in the textareas, 
                   and delete it
                        
                      }



                THIS NEXT PART IS ACTUALLY WHAT IS ALREADY DONE AND WORKING IN THE FUNCTION

                   // when click in submit, create the new object with the questions and answers just edited
                     // PUSH the existing question with the new data at the end of the array.
                   // UPLOAD the info into the JSON database.
                        

    */






    // Retrieve data from text areas
    const question = document.getElementById('question').value;
    const explanation = document.getElementById('explanation').value;
    const answer = document.getElementById('answer').value;
    const example = document.getElementById('example').value;

    // Create new data object
    const newData = {
        question: question,
        explanation: explanation,
        answer: answer,
        example: example
    };

    console.log("TEXTAREA OBJECT")
    console.log(newData)



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
            document.getElementById('question').value = ""
            document.getElementById('explanation').value = ""
            document.getElementById('answer').value = ""
            document.getElementById('example').value = ""

            alert('New data added successfully!');



        })
        .catch(error => console.error('Error adding new data:', error));





}



document.getElementById("submitButton").addEventListener("click", addNewData)