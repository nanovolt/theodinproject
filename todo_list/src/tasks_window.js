import "./tasks_window.css";
import format from "date-fns/format";
import { parseISO } from "date-fns/esm";
import * as DOM from "./tasks_window_DOM";

export default function TasksWindow(observable, storage) {
  const tasks = [];

  function hideTodoEditor() {
    const todoEditor = document.querySelector(".todo-editor");
    todoEditor.style.display = "none";
  }

  function initializeEventListeners() {
    function openTodoEditorEventListeners() {
      const addTask = document.querySelector(".add-todo");
      const todoEditor = document.querySelector(".todo-editor");

      addTask.addEventListener("click", () => {
        if (storage.getCurrentTodoList()) {
          todoEditor.style.display = "block";
        } else {
          alert("Choose To-do list first");
        }
      });

      todoEditor.addEventListener("blur", () => {
        hideTodoEditor();
      });
    }

    function getTodo() {
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

        todoEditor.style.display = "none";

        task.dueDate = format(parseISO(task.dueDate), "dd/MM/yyyy");
        DOM.createToDo(task);
      });
    }

    function cancel() {
      const cancelButt = document.querySelector(".cancel");
      cancelButt.addEventListener("click", () => {
        hideTodoEditor();
      });
    }

    openTodoEditorEventListeners();
    getTodo();
    cancel();
  }

  function initializeComponent(parentComponent) {
    DOM.createStaticElements(parentComponent);
    initializeEventListeners();
  }

  function getNotified() {
    console.log("tasks windows notified");
  }

  return {
    initializeComponent,
    getNotified,
  };
}
