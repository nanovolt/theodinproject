import "./main.css";
import Observable from "./task_observable";

export default function Main(taskProvider, tasksWindow) {
  const observable = new Observable();

  observable.subscribe(tasksWindow);

  function initializeComponent() {
    const component = document.createElement("div");
    component.classList.add("main-wrapper");

    const main = document.createElement("div");
    main.classList.add("main");

    main.appendChild(tasksWindow.initializeComponent());
    main.appendChild(taskProvider.initializeComponent());

    component.appendChild(main);
    document.body.appendChild(component);

    taskProvider.getUserTask(observable);
  }

  return { initializeComponent };
}
