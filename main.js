const todoForm = document.querySelector('#todo-form'); // форма
const addInput = document.querySelector('#add-input'); // поле
const todoList = document.querySelector('#todo-list'); // список
const todoItems = document.querySelectorAll('.todo-item'); // 

main();

function createTodoItem(title) {

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';

    const label = document.createElement('lable');
    label.innerHTML = title;
    label.className = 'title';

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'textfield';

    const editButton = document.createElement('button');
    editButton.innerHTML = 'Изменить';
    editButton.className = 'edit';

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Удалить';
    deleteButton.className = 'delete';

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
        
    bindEvents(listItem);

    return listItem;
}

function addTodoItem(event) {
    event.preventDefault(); // остановка отправки данных на сервер

    if(addInput.value === '') {
        return alert ('Введите название задачи.');
    }

    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = '';
}

function toggleTodoItem() {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
}

function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');
    
    if (isEditing) {
        title.innerHTML = editInput.value;
        this.innerHTML = 'Изменить';
    } else {
        editInput.value = title.innerHTML;
        this.innerHTML = 'Сохранить';
    }

    listItem.classList.toggle('editing');
}

function deleteTodoItem() {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
}

function  bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);

}

function main(){
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach(item => bindEvents(item));
}