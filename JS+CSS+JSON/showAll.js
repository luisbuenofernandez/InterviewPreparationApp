document.addEventListener('DOMContentLoaded', function () {

  const urlData = "https://getpantry.cloud/apiv1/pantry/a1edfe85-a3c4-44fe-807d-6717b6738152/basket/INTERVIEW PREPARATION APP OFFICIAL JSON"

          fetch(urlData)

    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('output');
      const searchInput = document.getElementById('search-input');

      // Function to display questions based on search term
      function displayQuestions(questions) {
        container.innerHTML = ''; // Clear the container
        questions.forEach((line, index) => {
          const questionLink = document.createElement('a');
          questionLink.href = `fetchQ&A.html?index=${index}`;
          questionLink.textContent = line.question;

          // Add click event listener to store link text in localStorage
          questionLink.addEventListener('click', function (event) {
            localStorage.setItem('savedQuestion', line.question);
          });

          container.appendChild(questionLink);

          // Optional: Add a line break after each link for better readability
          
        });
      }

      // Display all questions initially
      displayQuestions(data.lines);

      // Add event listener for search input
      searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredQuestions = data.lines.filter(line => line.question.toLowerCase().includes(searchTerm));
        displayQuestions(filteredQuestions);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
