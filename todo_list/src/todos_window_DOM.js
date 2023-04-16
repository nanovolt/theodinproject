export function createEditButton() {
  const element = document.createElement("button");
  element.classList.add("edit-todo-list-name");
  element.innerText = "Edit";
  return element;
}

export function createOkButton() {
  const element = document.createElement("button");
  element.classList.add("ok-edit-todo-list-name");
  element.innerText = "Ok";
  return element;
}

export function createEditInput(todoListName) {
  const element = document.createElement("input");
  element.classList.add("todo-list-edit-input");
  element.value = todoListName;
  return element;
}

export function createTodoListNameSpan(todoListName) {
  const element = document.createElement("span");
  element.classList.add("todo-list-name");
  element.innerText = todoListName;
  return element;
}

export function createTodoList(todoListName) {
  const todoListElem = document.createElement("li");
  todoListElem.classList.add("todo-list");

  const todoListNameElem = createTodoListNameSpan(todoListName);
  const editTodoListNameElem = createEditButton();

  todoListElem.appendChild(todoListNameElem);
  todoListElem.appendChild(editTodoListNameElem);

  document.querySelector(".list-of-todos").appendChild(todoListElem);
}
