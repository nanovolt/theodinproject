export default function TasksWindow() {
  const tasks = [];
  let task;

  function initializeComponent() {
    const component = document.createElement("div");
    component.classList.add("tasks-window");
    return component;
  }

  function renderTask() {
    const window = document.querySelector(".tasks-window");
    const taskElem = document.createElement("div");
    taskElem.classList.add("task");
    taskElem.innerText = `
    ${task.title}
    ${task.description}
    ${task.dueDate}
    ${task.priority} `;
    window.appendChild(taskElem);
  }

  function notify(param) {
    task = param;
    tasks.push(task);
    renderTask();
  }

  return { initializeComponent, notify, renderTask };
}
