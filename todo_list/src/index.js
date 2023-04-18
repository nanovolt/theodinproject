import "./index.css";
import InitializeComponents from "./component_manager";
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

const todosWindow = TodosWindow(observable, storage);
observable.subscribe(todosWindow);

const bodyComponents = [Header(), Main(), Footer()];
InitializeComponents(document.body, bodyComponents);

const mainComponents = [
  todosWindow,
  AddTodo(),
  ModalTodoEditor(observable, storage),
  TasksWindow(),
];

InitializeComponents(document.querySelector("main"), mainComponents);
