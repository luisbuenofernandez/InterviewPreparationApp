const urlData = "https://getpantry.cloud/apiv1/pantry/a1edfe85-a3c4-44fe-807d-6717b6738152/basket/INTERVIEW PREPARATION APP OFFICIAL JSON";
let data;

document.addEventListener('DOMContentLoaded', function () {
    const dataList = document.getElementById('output');
    const checkboxes = document.querySelectorAll('.checkbox');
    const searchBar = document.getElementById('search-input');

    checkboxes.forEach(checkbox => checkbox.addEventListener('change', filterData));
    searchBar.addEventListener('input', filterData);

    function filterData() {
        let filteredData = data.lines;

        // Get checked topic values and the 'editing' checkbox status
        const checkedTopics = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked && checkbox.value !== 'true')
            .map(checkbox => checkbox.value);

        const isEditingChecked = document.getElementById('edit').checked;

        // Apply filters
        filteredData = filteredData.filter(item => {
            const matchesTopic = checkedTopics.length === 0 || checkedTopics.includes(item.topic);
            const matchesEditing = !isEditingChecked || item.edition === true;
            return matchesTopic && matchesEditing;
        });

        // Apply search filter
        const searchTerm = searchBar.value.toLowerCase();
        if (searchTerm) {
            filteredData = filteredData.filter(item => item.question.toLowerCase().includes(searchTerm));
        }

        displayData(filteredData);
    }

    function displayData(filteredData) {
        dataList.innerHTML = '';

        filteredData.forEach(item => {
            const a = document.createElement('a');
            a.classList.add('data-item');
            a.href = 'fetch.html';

            // Save the question in localStorage with "savedQuestion"
            a.addEventListener('click', () => {
                localStorage.setItem('savedQuestion', item.question);
            });

            // Strip HTML tags from the question before displaying
            a.textContent = stripHtml(item.question);

            dataList.appendChild(a);
        });
    }

    // Function to strip HTML tags from a string
    function stripHtml(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    fetch(urlData)
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            displayData(data.lines);
        })
        .catch(error => console.error('Error loading data:', error));
});
