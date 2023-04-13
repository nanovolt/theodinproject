export default function TodosWindow(storage) {
  function initializeComponent(parentComponent) {
    const component = document.createElement("div");
    component.classList.add("todos-window");

    const todosControls = document.createElement("div");
    todosControls.classList.add("todos-controls");

    const openTodoListInput = document.createElement("button");
    openTodoListInput.classList.add("open-todo-list-input");
    openTodoListInput.innerText = "Add";

    const deleteTodoListButton = document.createElement("button");
    deleteTodoListButton.classList.add("delete-todo-list");
    deleteTodoListButton.innerText = "Delete";

    const todoListEditor = document.createElement("div");
    todoListEditor.classList.add("todo-list-editor");

    const todoListInput = document.createElement("input");
    todoListInput.classList.add("todo-list-input");

    const addTodoListButton = document.createElement("button");
    addTodoListButton.classList.add("add-todo-list");

    addTodoListButton.innerText = "Add";
    todoListEditor.appendChild(todoListInput);
    todoListEditor.appendChild(addTodoListButton);

    todosControls.appendChild(openTodoListInput);
    todosControls.appendChild(deleteTodoListButton);
    todosControls.appendChild(todoListEditor);

    component.appendChild(todosControls);

    const listOfTodos = document.createElement("ul");
    listOfTodos.classList.add("list-of-todos");

    const arrayOfTodoLists = storage.getArrayOfTodoLists();

    arrayOfTodoLists.forEach((todoList) => {
      const todoListElem = document.createElement("li");
      todoListElem.classList.add("todo-list");
      todoListElem.innerText = todoList.name;
      listOfTodos.appendChild(todoListElem);
    });
    component.appendChild(listOfTodos);

    parentComponent.appendChild(component);
  }

  function addTodoList() {
    const addTodoListButton = document.querySelector(".add-todo-list");
    const inputFormEl = document.querySelector(".todo-list-input");
    addTodoListButton.addEventListener("click", () => {
      if (inputFormEl.value && storage.isNotPresent(inputFormEl.value)) {
        storage.addTodoList(inputFormEl.value);
        console.log(`added to storage: ${inputFormEl.value}`);
      } else {
        console.log(`didn't add to storage: ${inputFormEl.value}`);
      }
    });
  }

  function initializeEventListeners() {
    addTodoList();
  }

  return { initializeComponent, initializeEventListeners };
}
