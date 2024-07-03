document.addEventListener('DOMContentLoaded', function () {
          fetch('JS+CSS+JSON/data.json')

    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('questions-container');
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
          container.appendChild(document.createElement('br'));
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
