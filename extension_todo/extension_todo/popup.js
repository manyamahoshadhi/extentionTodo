document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todoInput");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todoList = document.getElementById("todoList");

  // Load stored todos when the extension is opened
  chrome.storage.sync.get("todos", function (data) {
    if (data.todos) {
      data.todos.forEach(function (todo) {
        addTodoItem(todo);
      });
    }
  });

  addTodoBtn.addEventListener("click", function () {
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      addTodoItem(todoText);
      saveTodos();
      todoInput.value = "";
    }
  });

  function addTodoItem(todoText) {
    const todoItem = document.createElement("li");
    todoItem.textContent = todoText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("id", "del");
    deleteButton.addEventListener("click", function () {
      todoItem.remove();
      saveTodos();
    });

    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  }

  function saveTodos() {
    const todos = Array.from(todoList.children).map(function (todoItem) {
      return todoItem.textContent.replace("Delete", "").trim();
    });
    chrome.storage.sync.set({ todos: todos });
  }
});
