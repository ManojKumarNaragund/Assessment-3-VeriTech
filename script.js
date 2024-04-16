document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((task, index) => addTask(task.text));

    addButton.addEventListener('click', function() {
        if (taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    function addTask(text) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task';
        taskItem.innerHTML = `
          <span>${text}</span>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        `;
        taskList.appendChild(taskItem);

        const span = taskItem.querySelector('span');
        const editButton = taskItem.querySelector('.edit');
        const deleteButton = taskItem.querySelector('.delete');

        editButton.addEventListener('click', function() {
            const newText = prompt('Edit task:', text);
            if (newText !== null) {
                span.innerText = newText;
                updateTasksInLocalStorage();
            }
        });

        deleteButton.addEventListener('click', function() {
            taskList.removeChild(taskItem);
            updateTasksInLocalStorage();
        });

        updateTasksInLocalStorage();
        updateTaskCount();
    }

    function updateTasksInLocalStorage() {
        const tasks = Array.from(document.querySelectorAll('.task')).map(taskItem => ({
            text: taskItem.querySelector('span').innerText,
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTaskCount();
    }

    function updateTaskCount() {
        const totalTasks = document.querySelectorAll('.task').length;
        taskCount.innerText = `Total Tasks: ${totalTasks}`;
    }
});