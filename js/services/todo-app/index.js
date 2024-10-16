if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "../../en-za/";
}

window.onload = function() {
    loadTodos();
};

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    
    if (todoText === "") {
        showNotification("Please enter a task!");
        return;
    }

    const todoList = document.getElementById('todoList');

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = function() {
        if (checkbox.checked) {
            li.classList.add('completed');
            setTimeout(() => {
                deleteTodoFromStorage(todoText);
                todoList.removeChild(li);
            }, 500);
        } else {
            li.classList.remove('completed');
        }
    };

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(todoText));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    deleteButton.onclick = function() {
        deleteTodoFromStorage(todoText);
        todoList.removeChild(li);
    };

    li.appendChild(deleteButton);
    todoList.appendChild(li);
    todoInput.value = "";

    saveTodoToStorage(todoText);
}

function saveTodoToStorage(todoText) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoList = document.getElementById('todoList');

    todos.forEach(todoText => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onclick = function() {
            if (checkbox.checked) {
                li.classList.add('completed');
                setTimeout(() => {
                    deleteTodoFromStorage(todoText);
                    todoList.removeChild(li);
                }, 500);
            } else {
                li.classList.remove('completed');
            }
        };

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(todoText));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        deleteButton.onclick = function() {
            deleteTodoFromStorage(todoText);
            todoList.removeChild(li);
        };

        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

function deleteTodoFromStorage(todoText) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const updatedTodos = todos.filter(todo => todo !== todoText);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
}