// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const loadingStatus = document.getElementById('loading-status');
    const apiUrl = 'http://127.0.0.1:5000/api/tasks'; // Must match Flask server address

    /**
     * Renders an individual task item into the list.
     * @param {Object} task - The task object from the API.
     */
    function renderTask(task) {
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Apply specific border color based on priority
        let priorityBorder = '';
        if (task.priority === 'High') {
            priorityBorder = '#dc3545';
        } else if (task.priority === 'Medium') {
            priorityBorder = '#ffc107';
        } else if (task.priority === 'Low') {
            priorityBorder = '#17a2b8';
        }
        listItem.style.borderLeftColor = priorityBorder;

        listItem.innerHTML = `
            <span class="task-text">${task.task}</span>
            <span class="priority ${task.priority}">${task.priority}</span>
        `;

        taskList.appendChild(listItem);
    }

    /**
     * Fetches tasks from the Python API and renders them.
     */
    async function fetchTasks() {
        taskList.innerHTML = ''; // Clear previous tasks

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Hide loading status and display tasks
            loadingStatus.style.display = 'none';

            if (data.length === 0) {
                taskList.innerHTML = '<li class="task-item">No tasks found.</li>';
                return;
            }

            data.forEach(task => renderTask(task));

        } catch (error) {
            // Display an error message if the server is not running
            loadingStatus.textContent = `❌ Error fetching tasks. Is the Python server running? (${error.message})`;
            loadingStatus.style.color = '#dc3545'; // Red for error
            console.error('Fetch error:', error);
        }
    }

    // Initialize the task fetching
    fetchTasks();
});