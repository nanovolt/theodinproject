import "./index.css";
import "./fonts/css/fa.css";

import InitializeComponents from "./component_manager";
import TodosStorage from "./todos_storage";
import Observable from "./task_observable";

import Header from "./header";
import Main from "./main";
import Footer from "./footer";

import TodosWindow from "./todos_window";
import TasksWindow from "./tasks_window";

const storage = TodosStorage();
storage.init();
const observable = new Observable();

const todosWindow = TodosWindow(observable, storage);
const tasksWindow = TasksWindow(observable, storage);

observable.subscribe(tasksWindow);

const bodyComponents = [Header(), Main(), Footer()];
InitializeComponents(document.body, bodyComponents);

const mainComponents = [todosWindow, tasksWindow];

InitializeComponents(document.querySelector("main"), mainComponents);
