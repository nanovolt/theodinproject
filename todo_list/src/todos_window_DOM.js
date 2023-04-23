function setFixedPosition() {
  const { height } = document
    .querySelector(".todo-list-name-input")
    .getBoundingClientRect();

  document.querySelector(".add-todo-list-popup").style.top = `${height}px`;
}

export function createStaticElements(parentComponent) {
  const component = document.createElement("div");
  component.classList.add("todos-window");

  const todoListInputContainer = document.createElement("div");
  todoListInputContainer.classList.add("todo-list-input-container");

  const todoListInput = document.createElement("input");
  todoListInput.classList.add("todo-list-name-input");
  todoListInput.maxLength = 48;
  todoListInput.pattern = "^[^ ].+[^ ]$";

  const addTodoListButton = document.createElement("button");
  addTodoListButton.classList.add("add-todo-list");
  addTodoListButton.innerText = "Add";

  const addTodoListPopup = document.createElement("div");
  addTodoListPopup.classList.add("add-todo-list-popup");

  const listOfTodos = document.createElement("ul");
  listOfTodos.classList.add("list-of-todo-lists");

  todoListInputContainer.appendChild(todoListInput);
  todoListInputContainer.appendChild(addTodoListButton);
  todoListInputContainer.appendChild(addTodoListPopup);

  component.appendChild(todoListInputContainer);
  component.appendChild(listOfTodos);

  parentComponent.appendChild(component);

  setFixedPosition();
}

export function createEditButton(parentElement) {
  const element = document.createElement("button");
  element.classList.add("icon");
  element.classList.add("edit-todo-list-name");

  parentElement.prepend(element);
}

export function createOkButton(parentElement) {
  const element = document.createElement("button");
  element.classList.add("icon");
  element.classList.add("ok-edit-todo-list-name");

  parentElement.prepend(element);
}

export function createEditInput(parentElement, todoListName) {
  const element = document.createElement("input");
  element.classList.add("todo-list-edit-input");
  element.value = todoListName;
  element.maxLength = 48;
  parentElement.prepend(element);
}

export function createTodoListNameSpan(parentElement, todoListName) {
  const element = document.createElement("span");
  element.classList.add("todo-list-name");
  element.innerText = todoListName;

  parentElement.prepend(element);
}

export function createDeleteButton(parentElement) {
  const element = document.createElement("button");
  element.classList.add("icon");
  element.classList.add("delete-todo-list");

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

  createEditButton(element);
  createTodoListNameSpan(element, todoListName);
  createDeleteButton(element);

  document.querySelector(".list-of-todo-lists").appendChild(element);
}

export function displayPopup(message, inputValue, top = 0, left = 0) {
  const popup = document.querySelector(".add-todo-list-popup");
  if (message === "Already have:") {
    popup.style.cssText = `border-right: 8px solid red;`;
  } else {
    popup.style.cssText = `border-right: 8px solid green;`;
  }

  // console.log("top:", top, "left:", left);

  document.querySelector(".add-todo-list-popup").style.top = `${top}px`;
  document.querySelector(".add-todo-list-popup").style.left = `${left}px`;

  popup.style.visibility = "visible";
  popup.innerText = `${message} ${inputValue}`;
  popup.style.opacity = "1";

  setTimeout(() => {
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
  }, 1000);
}
