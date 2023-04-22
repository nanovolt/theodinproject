export function createTodoEditor(parentComponent) {
  const component = document.createElement("div");
  component.classList.add("todo-editor");

  const form = document.createElement("form");
  form.classList.add("todo-editor-form");

  const title = document.createElement("input");
  title.name = "title";
  title.classList.add("input-title");
  title.placeholder = "task title...";
  title.required = true;

  const description = document.createElement("textarea");
  description.name = "description";
  description.classList.add("input-description");
  description.placeholder = "description (optional)";

  const dueDate = document.createElement("input");
  dueDate.name = "dueDate";
  dueDate.classList.add("input-due-date");
  dueDate.type = "date";
  dueDate.required = true;

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
  // const labelForFirst = document.createElement("label");
  // labelForFirst.for = "first";
  // labelForFirst.setAttribute("for", "first");
  // labelForFirst.innerText = "Critical";

  const prioritySecond = document.createElement("input");
  prioritySecond.name = "priority";
  prioritySecond.id = "second";
  prioritySecond.type = "radio";
  prioritySecond.value = "Urgent";
  prioritySecond.title = "Urgent";
  // const labelForSecond = document.createElement("label");
  // labelForSecond.for = "second";
  // labelForSecond.setAttribute("for", "second");
  // labelForSecond.innerText = "Urgent";

  const priorityThird = document.createElement("input");
  priorityThird.name = "priority";
  priorityThird.id = "third";
  priorityThird.type = "radio";
  priorityThird.value = "Normal";
  priorityThird.title = "Normal";

  priorityThird.checked = true;

  // const labelForThird = document.createElement("label");
  // labelForThird.for = "third";
  // labelForThird.setAttribute("for", "third");
  // labelForThird.innerText = "Normal";

  const priorityFourth = document.createElement("input");
  priorityFourth.name = "priority";
  priorityFourth.id = "fourth";
  priorityFourth.type = "radio";
  priorityFourth.value = "Low";
  priorityFourth.title = "Low";

  // const labelForFourth = document.createElement("label");
  // labelForFourth.for = "fourth";
  // labelForFourth.setAttribute("for", "fourth");
  // labelForFourth.innerText = "Low";

  const add = document.createElement("button");
  add.classList.add("add");
  add.type = "submit";
  add.innerText = "Add";

  const cancelEl = document.createElement("button");
  cancelEl.classList.add("cancel");
  cancelEl.type = "button";
  cancelEl.innerText = "Cancel";

  prioritySelector.appendChild(priorityFirst);
  // prioritySelector.appendChild(labelForFirst);
  prioritySelector.appendChild(prioritySecond);
  // prioritySelector.appendChild(labelForSecond);
  prioritySelector.appendChild(priorityThird);
  // prioritySelector.appendChild(labelForThird);
  prioritySelector.appendChild(priorityFourth);
  // prioritySelector.appendChild(labelForFourth);

  form.appendChild(title);
  form.appendChild(description);
  form.appendChild(dueDate);
  form.appendChild(priorityLabel);
  form.appendChild(prioritySelector);

  form.appendChild(add);
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
  createTodoEditor(component);
  component.appendChild(listOfTodos);

  parentComponent.appendChild(component);
}

export function createToDo(task) {
  const taskElem = document.createElement("div");
  taskElem.classList.add("task");
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
  taskDueDate.innerText = task.dueDate;
  taskPriority.innerText = task.priority;

  taskElem.appendChild(taskTitle);
  taskElem.appendChild(taskDescription);
  taskElem.appendChild(taskDueDate);
  taskElem.appendChild(taskPriority);

  document.querySelector(".list-of-todos").appendChild(taskElem);
}
