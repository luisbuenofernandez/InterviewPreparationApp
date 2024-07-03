document.addEventListener('DOMContentLoaded', function () {


    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('questions-container');
        data.lines.forEach((line, index) => {
          const questionLink = document.createElement('a');
          questionLink.href = `fetchQ&A.html?index=${index}`;
          questionLink.textContent = line.question;


  
          // Add click event listener to store link text in localStorage
          questionLink.addEventListener('click', function (event) {
            localStorage.setItem('savedQuestion', line.question);
          });

          
  
          container.appendChild(questionLink);
  
          // Optional: Add a line break after each link for better readability
          container.appendChild(document.createElement('br'));
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  

  