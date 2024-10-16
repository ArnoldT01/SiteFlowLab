if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "../../en-za/";
}

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
        todoList.removeChild(li);
    };

    li.appendChild(deleteButton);
    todoList.appendChild(li);
    todoInput.value = "";
}