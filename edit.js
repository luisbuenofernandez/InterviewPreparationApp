document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const line = data.lines[index];
            document.getElementById('question').value = line.question;
            document.getElementById('explanation').value = line.explanation;
            document.getElementById('example').value = line.example;

            document.getElementById('save-btn').addEventListener('click', function() {
                line.question = document.getElementById('question').value;
                line.explanation = document.getElementById('explanation').value;
                line.example = document.getElementById('example').value;

                // Send updated data to the server to save changes
                fetch('save_data.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert('Data updated successfully!');
                        window.location.href = 'index.html';
                    } else {
                        alert('Error updating data.');
                    }
                })
                .catch(error => console.error('Error updating data:', error));
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
