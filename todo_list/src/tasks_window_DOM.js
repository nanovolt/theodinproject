export function createTodoEditor(parentComponent) {
  const component = document.createElement("div");
  component.classList.add("todo-editor");

  const form = document.createElement("form");
  form.classList.add("todo-editor-form");

  const title = document.createElement("input");
  title.name = "title";
  title.classList.add("input-title");
  title.placeholder = "task title...";
  title.maxLength = 64;
  title.setAttribute("required", true);

  const description = document.createElement("textarea");
  description.name = "description";
  description.classList.add("input-description");
  description.placeholder = "description (optional)";
  description.maxLength = 256;

  const dueDateLabel = document.createElement("div");
  dueDateLabel.classList.add("due-date-label");
  dueDateLabel.innerText = "Due date";

  const dueDate = document.createElement("input");
  dueDate.name = "dueDate";
  dueDate.classList.add("input-due-date");
  dueDate.type = "date";

  // if set, requires anyway
  // dueDate.setAttribute("required", false);

  const priorityLabel = document.createElement("div");
  priorityLabel.classList.add("priority-label");
  priorityLabel.innerText = "Priority";

  const prioritySelector = document.createElement("div");
  prioritySelector.classList.add("priority-selector");

  const priorityFirst = document.createElement("input");
  priorityFirst.name = "priority";
  priorityFirst.id = "first";
  priorityFirst.type = "radio";
  priorityFirst.value = "Critical";
  priorityFirst.title = "Critical";

  const prioritySecond = document.createElement("input");
  prioritySecond.name = "priority";
  prioritySecond.id = "second";
  prioritySecond.type = "radio";
  prioritySecond.value = "Urgent";
  prioritySecond.title = "Urgent";

  const priorityThird = document.createElement("input");
  priorityThird.name = "priority";
  priorityThird.id = "third";
  priorityThird.type = "radio";
  priorityThird.value = "Normal";
  priorityThird.title = "Normal";
  priorityThird.setAttribute("checked", true);

  const priorityFourth = document.createElement("input");
  priorityFourth.name = "priority";
  priorityFourth.id = "fourth";
  priorityFourth.type = "radio";
  priorityFourth.value = "Low";
  priorityFourth.title = "Low";

  const action = document.createElement("button");
  action.classList.add("action");
  action.type = "submit";

  const cancelEl = document.createElement("button");
  cancelEl.classList.add("cancel");
  cancelEl.type = "button";
  cancelEl.innerText = "Cancel";

  const editorBackground = document.createElement("div");
  editorBackground.classList.add("editor-background");
  document.body.appendChild(editorBackground);

  prioritySelector.appendChild(priorityFirst);
  prioritySelector.appendChild(prioritySecond);
  prioritySelector.appendChild(priorityThird);
  prioritySelector.appendChild(priorityFourth);

  form.appendChild(title);
  form.appendChild(description);
  form.appendChild(dueDateLabel);
  form.appendChild(dueDate);
  form.appendChild(priorityLabel);
  form.appendChild(prioritySelector);

  form.appendChild(action);
  form.appendChild(cancelEl);

  component.appendChild(form);

  parentComponent.appendChild(component);
}

export function createStaticElements(parentComponent) {
  const component = document.createElement("div");
  component.classList.add("tasks-window");

  const addTodo = document.createElement("button");
  addTodo.classList.add("add-todo");
  addTodo.innerText = "Add to-do";

  const listOfTodos = document.createElement("ul");
  listOfTodos.classList.add("list-of-todos");

  component.appendChild(addTodo);
  component.appendChild(listOfTodos);

  createTodoEditor(component);

  parentComponent.appendChild(component);
}

export function createEditButton(parentElement) {
  const element = document.createElement("button");
  element.classList.add("icon");
  element.classList.add("edit-todo");

  parentElement.appendChild(element);
}

export function createOkButton(parentElement) {
  const element = document.createElement("button");
  element.classList.add("icon");
  element.classList.add("ok-edit-todo");

  parentElement.appendChild(element);
}

export function createDeleteButton(parentElement) {
  const element = document.createElement("button");
  element.classList.add("icon");
  element.classList.add("delete-todo");

  parentElement.appendChild(element);
}

export function createToDo(task, date) {
  const todoElem = document.createElement("li");
  todoElem.classList.add("task");
  todoElem.dataset.id = task.id;

  const todoContent = document.createElement("li");
  todoContent.classList.add("todo-content");

  const taskTitle = document.createElement("div");
  taskTitle.classList.add("task-title");
  const taskDescription = document.createElement("div");
  taskDescription.classList.add("task-description");
  const taskDueDate = document.createElement("div");
  taskDueDate.classList.add("task-due-date");
  const taskPriority = document.createElement("div");
  taskPriority.classList.add("task-priority");

  switch (task.priority) {
    case "Critical":
      taskPriority.classList.add("critical");
      break;
    case "Urgent":
      taskPriority.classList.add("urgent");
      break;
    case "Normal":
      taskPriority.classList.add("normal");
      break;
    case "Low":
      taskPriority.classList.add("low");
      break;
    default:
      break;
  }
  // console.log(parseISO(task.dueDate, "eeee do MMM, yyyy"));

  taskTitle.innerText = task.title;
  taskDescription.innerText = task.description;
  // taskDueDate.innerText = task.dueDate;
  taskDueDate.innerText = date;

  taskPriority.innerText = task.priority;

  todoContent.appendChild(taskTitle);
  todoContent.appendChild(taskDescription);
  todoContent.appendChild(taskDueDate);
  todoContent.appendChild(taskPriority);

  todoElem.appendChild(todoContent);
  createEditButton(todoElem);
  createDeleteButton(todoElem);

  document.querySelector(".list-of-todos").appendChild(todoElem);
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
