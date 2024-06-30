document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('questions-container');
            data.lines.forEach((line, index) => {
                const questionLink = document.createElement('a');
                questionLink.href = `fetchQ&A.html?index=${index}`;
                questionLink.textContent = line.question;
                container.appendChild(questionLink);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
