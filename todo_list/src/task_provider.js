export default function TaskProdiver() {
  const task = {};

  function initializeComponent() {
    const component = document.createElement("div");
    component.classList.add("add-task");

    const form = document.createElement("form");
    form.classList.add("add-task-form");

    const title = document.createElement("input");
    title.name = "title";
    title.classList.add("title");
    title.placeholder = "task title...";

    const description = document.createElement("textarea");
    description.name = "description";
    description.classList.add("description");
    description.placeholder = "description (optional)";

    const dueDate = document.createElement("input");
    dueDate.name = "dueDate";
    dueDate.classList.add("due-date");
    dueDate.type = "date";

    const priorityFirst = document.createElement("input");
    priorityFirst.name = "priority";
    priorityFirst.classList.add("priority-first");
    priorityFirst.type = "radio";
    priorityFirst.value = "1";

    const prioritySecond = document.createElement("input");
    prioritySecond.name = "priority";
    prioritySecond.classList.add("priority-second");
    prioritySecond.type = "radio";
    prioritySecond.value = "2";

    const priorityThird = document.createElement("input");
    priorityThird.name = "priority";
    priorityThird.classList.add("priority-third");
    priorityThird.type = "radio";
    priorityThird.value = "3";

    const add = document.createElement("button");
    add.classList.add("add");
    add.type = "submit";
    add.innerText = "add";

    form.appendChild(title);
    form.appendChild(description);
    form.appendChild(dueDate);
    form.appendChild(priorityFirst);
    form.appendChild(prioritySecond);
    form.appendChild(priorityThird);
    form.appendChild(add);

    component.appendChild(form);

    return component;
  }

  function getUserTask(observable) {
    const taskForm = document.querySelector(".add-task-form");

    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formdata = new FormData(taskForm);

      task.title = formdata.get("title");
      task.description = formdata.get("description");
      task.dueDate = formdata.get("dueDate");
      task.priority = formdata.get("priority");

      console.log(task);
      observable.notify({ ...task });
    });
  }

  function getTask() {
    return task;
  }

  return { initializeComponent, getUserTask, getTask };
}
