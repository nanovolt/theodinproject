import "./tasks_window.css";
import format from "date-fns/format";
import { parseISO } from "date-fns/esm";

export default function TasksWindow() {
  const tasks = [];
  let task;

  function initializeComponent(parentComponent) {
    const component = document.createElement("div");
    component.classList.add("tasks-window");
    parentComponent.appendChild(component);
  }

  function renderTask() {
    const window = document.querySelector(".tasks-window");
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
    taskDueDate.innerText = format(parseISO(task.dueDate), "dd/MM/yyyy");
    // taskDueDate.innerText = task.dueDate;
    taskPriority.innerText = task.priority;

    taskElem.appendChild(taskTitle);
    taskElem.appendChild(taskDescription);
    taskElem.appendChild(taskDueDate);
    taskElem.appendChild(taskPriority);

    window.appendChild(taskElem);
  }

  function notify(param) {
    task = param;
    tasks.push(task);
    renderTask();
  }

  function initializeEventListeners() {}

  return { initializeComponent, initializeEventListeners, notify, renderTask };
}
