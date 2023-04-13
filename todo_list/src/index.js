import "./index.css";
import {
  AppendComponents,
  initializeEventListeners,
} from "./component_manager";
import TodosStorage from "./todos_storage";
import Observable from "./task_observable";

import Header from "./header";
import Main from "./main";
import Footer from "./footer";

import TodosWindow from "./todos_window";
import AddTodo from "./add_todo";
import ModalTodoEditor from "./modal_todo_editor";
import TasksWindow from "./tasks_window";

const storage = TodosStorage();
storage.init();
const observable = new Observable();

const bodyComponents = [Header(), Main(), Footer()];
AppendComponents(document.body, bodyComponents);

const mainComponents = [
  TodosWindow(storage),
  AddTodo(),
  ModalTodoEditor(observable, storage),
  TasksWindow(),
];
AppendComponents(document.querySelector("main"), mainComponents);

initializeEventListeners(bodyComponents.concat(mainComponents));
