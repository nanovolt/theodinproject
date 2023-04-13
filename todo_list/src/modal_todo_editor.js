import "./modal_todo_editor.css";

export default function ModalTodoEditor(observable, storage) {
  function getUserTask() {
    const todoEditor = document.querySelector(".todo-editor");
    const todoEditorForm = document.querySelector(".todo-editor-form");

    todoEditorForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formdata = new FormData(todoEditorForm);
      const task = {};
      task.title = formdata.get("title");
      task.description = formdata.get("description");
      task.dueDate = formdata.get("dueDate");
      task.priority = formdata.get("priority");

      storage.addTodoList(task);
      observable.notify({ ...task });

      todoEditor.style.display = "none";
    });
  }

  function cancel() {
    const cancelButt = document.querySelector(".cancel");
    cancelButt.addEventListener("click", () => {
      const todoEditor = document.querySelector(".todo-editor");
      todoEditor.style.display = "none";
    });
  }

  function initializeEventListeners() {
    getUserTask();
    cancel();
  }

  function initializeComponent(parentComponent) {
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

    const prioritySelector = document.createElement("div");
    prioritySelector.classList.add("priority-selector");

    const priorityFirst = document.createElement("input");
    priorityFirst.name = "priority";
    priorityFirst.id = "first";
    priorityFirst.type = "radio";
    priorityFirst.value = "Critical";

    const labelForFirst = document.createElement("label");
    labelForFirst.for = "first";
    labelForFirst.setAttribute("for", "first");
    labelForFirst.innerText = "Critical";

    const prioritySecond = document.createElement("input");
    prioritySecond.name = "priority";
    prioritySecond.id = "second";
    prioritySecond.type = "radio";
    prioritySecond.value = "Urgent";

    const labelForSecond = document.createElement("label");
    labelForSecond.for = "second";
    labelForSecond.setAttribute("for", "second");
    labelForSecond.innerText = "Urgent";

    const priorityThird = document.createElement("input");
    priorityThird.name = "priority";
    priorityThird.id = "third";
    priorityThird.type = "radio";
    priorityThird.value = "Normal";
    priorityThird.checked = true;
    const labelForThird = document.createElement("label");
    labelForThird.for = "third";
    labelForThird.setAttribute("for", "third");
    labelForThird.innerText = "Normal";

    const priorityFourth = document.createElement("input");
    priorityFourth.name = "priority";
    priorityFourth.id = "fourth";
    priorityFourth.type = "radio";
    priorityFourth.value = "Low";

    const labelForFourth = document.createElement("label");
    labelForFourth.for = "fourth";
    labelForFourth.setAttribute("for", "fourth");
    labelForFourth.innerText = "Low";

    const add = document.createElement("button");
    add.classList.add("add");
    add.type = "submit";
    add.innerText = "Add";

    const cancelEl = document.createElement("button");
    cancelEl.classList.add("cancel");
    cancelEl.type = "button";
    cancelEl.innerText = "Cancel";

    prioritySelector.appendChild(priorityFirst);
    prioritySelector.appendChild(labelForFirst);
    prioritySelector.appendChild(prioritySecond);
    prioritySelector.appendChild(labelForSecond);
    prioritySelector.appendChild(priorityThird);
    prioritySelector.appendChild(labelForThird);
    prioritySelector.appendChild(priorityFourth);
    prioritySelector.appendChild(labelForFourth);

    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(dueDate);
    form.appendChild(prioritySelector);

    form.appendChild(add);
    form.appendChild(cancelEl);

    component.appendChild(form);

    parentComponent.appendChild(component);
  }

  return { initializeComponent, initializeEventListeners };
}
