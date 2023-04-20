function setFixedPosition() {
  const { height } = document
    .querySelector(".todo-list-name-input")
    .getBoundingClientRect();

  document.querySelector(".add-todo-list-popup").style.top = `${height}px`;
}

export function createStaticElements(parentComponent) {
  const element = document.createElement("div");
  element.classList.add("todos-window");

  const todoListInputContainer = document.createElement("div");
  todoListInputContainer.classList.add("todo-list-input-container");

  const todoListInput = document.createElement("input");
  todoListInput.classList.add("todo-list-name-input");
  todoListInput.pattern = "^[^ ].+[^ ]$";

  const addTodoListButton = document.createElement("button");
  addTodoListButton.classList.add("add-todo-list");
  addTodoListButton.innerText = "Add";

  const deleteTodoListButton = document.createElement("button");
  deleteTodoListButton.classList.add("delete-todo-list");
  deleteTodoListButton.innerText = "Delete";

  const addTodoListPopup = document.createElement("div");
  addTodoListPopup.classList.add("add-todo-list-popup");

  const listOfTodos = document.createElement("ul");
  listOfTodos.classList.add("list-of-todos");

  todoListInputContainer.appendChild(todoListInput);
  todoListInputContainer.appendChild(addTodoListButton);
  todoListInputContainer.appendChild(deleteTodoListButton);
  todoListInputContainer.appendChild(addTodoListPopup);

  element.appendChild(todoListInputContainer);
  element.appendChild(listOfTodos);

  parentComponent.appendChild(element);

  setFixedPosition();
}

export function createEditButton(parentElement) {
  const element = document.createElement("button");
  element.classList.add("edit-todo-list-name");
  element.innerText = "Edit";
  parentElement.appendChild(element);
}

export function createOkButton(parentElement) {
  const element = document.createElement("button");
  element.classList.add("ok-edit-todo-list-name");
  element.innerText = "Ok";
  parentElement.appendChild(element);
}

export function createEditInput(parentElement, todoListName) {
  const element = document.createElement("input");
  element.classList.add("todo-list-edit-input");
  element.value = todoListName;
  parentElement.appendChild(element);
}

export function createTodoListNameSpan(parentElement, todoListName) {
  const element = document.createElement("span");
  element.classList.add("todo-list-name");
  element.innerText = todoListName;
  parentElement.appendChild(element);
}

export function createTodoList(todoListName, isCurrent) {
  const element = document.createElement("li");
  element.classList.add("todo-list");

  if (isCurrent) {
    const current = document.querySelector(".current");
    if (current) current.classList.remove("current");
    element.classList.add("current");
  }
  createTodoListNameSpan(element, todoListName);
  createEditButton(element);

  document.querySelector(".list-of-todos").appendChild(element);
}

export function displayPopup(message, inputValue) {
  const popup = document.querySelector(".add-todo-list-popup");
  if (message === "Already have:") {
    popup.style.cssText = `border-right: 8px solid red;`;
  } else {
    popup.style.cssText = `border-right: 8px solid green;`;
  }

  const { height } = document
    .querySelector(".todo-list-name-input")
    .getBoundingClientRect();

  document.querySelector(".add-todo-list-popup").style.top = `${height}px`;
  popup.style.visibility = "visible";
  popup.innerText = `${message} ${inputValue}`;
  popup.style.opacity = "1";

  setTimeout(() => {
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
  }, 1000);
}
