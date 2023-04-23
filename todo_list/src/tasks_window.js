import "./tasks_window.css";
import format from "date-fns/format";
import { parseISO } from "date-fns/esm";
import * as DOM from "./tasks_window_DOM";

export default function TasksWindow(observable, storage) {
  let func;

  function hideTodoEditor() {
    const editorBackground = document.querySelector(".editor-background");
    const todoEditor = document.querySelector(".todo-editor");
    const todoEditorForm = document.querySelector(".todo-editor-form");

    const inputDescription = todoEditorForm.querySelector(".input-description");

    editorBackground.style.display = "none";
    todoEditor.style.display = "none";
    todoEditorForm.reset();

    document.querySelector("#third").checked = true;
    inputDescription.style.height = "auto";
  }

  function todoEventListeners(id) {
    const todo = document.querySelector(`[data-id="${id}"]`);
    const editTodo = todo.querySelector(".edit-todo");
    const deleteTodo = todo.querySelector(".delete-todo");
    const todoEditorForm = document.querySelector(".todo-editor-form");
    const inputTitle = todoEditorForm.querySelector(".input-title");
    const inputDescription = todoEditorForm.querySelector(".input-description");
    const inputDueDate = todoEditorForm.querySelector(".input-due-date");
    const inputPriority = todoEditorForm.querySelector(".input-title");
    const editorBackground = document.querySelector(".editor-background");
    const todoEditor = document.querySelector(".todo-editor");

    function editTodoFunc() {
      console.log("edit todo");
    }

    editTodo.addEventListener("click", () => {
      func = editTodoFunc;

      const storageTodo = storage.getTodo(id);

      editorBackground.style.height = `${document.body.scrollHeight}px`;
      editorBackground.style.display = "block";
      todoEditor.style.display = "block";

      inputTitle.value = storageTodo.title;
      inputDescription.value = storageTodo.description;
      inputDescription.style.height = `${inputDescription.scrollHeight}px`;

      // inputDueDate.value = "0001-01-01";
      inputDueDate.value = storageTodo.dueDate;

      console.log(storageTodo.priority);

      const radio = todoEditorForm.querySelector(
        `input[value="${storageTodo.priority}"]`
      );
      console.log(radio);

      radio.checked = true;
      inputTitle.focus();
    });

    deleteTodo.addEventListener("click", () => {
      storage.deleteTodo(id);
      todo.remove();
    });
  }

  function addTodo(e) {
    e.preventDefault();

    const todoEditorForm = document.querySelector(".todo-editor-form");

    const formdata = new FormData(todoEditorForm);
    const task = {};
    task.title = formdata.get("title");
    task.description = formdata.get("description");
    task.dueDate = formdata.get("dueDate");
    task.priority = formdata.get("priority");

    hideTodoEditor();

    if (!task.dueDate) {
      task.dueDate = format(parseISO(new Date().toISOString()), "yyyy-MM-dd");
      // task.dueDate = format(parseISO(new Date().toISOString()), "PPPP");
    } else {
      // isoDate = format(parseISO(task.dueDate), "yyyy-MM-dd");
      // task.dueDate = format(parseISO(task.dueDate), "PPPP");
    }

    task.title = task.title.trim().split(/[\s]+/).join(" ");
    task.description = task.description.trim().split(/[\s]+/).join(" ");

    if (!storage.getArrayofTodos().length) {
      task.id = 0;
    } else {
      for (let i = 0; i <= storage.getIds().size; i += 1) {
        if (!storage.getIds().has(i)) {
          task.id = i;
          break;
        }
      }
    }

    storage.addTodo(task);

    const date = format(parseISO(task.dueDate), "PPPP");
    DOM.createToDo(task, date);
    todoEventListeners(task.id);
  }

  function initializeEventListeners() {
    const addTask = document.querySelector(".add-todo");
    const todoEditor = document.querySelector(".todo-editor");
    const todoEditorForm = document.querySelector(".todo-editor-form");
    const inputTitle = todoEditorForm.querySelector(".input-title");
    const inputDescription = todoEditorForm.querySelector(".input-description");
    const editorBackground = document.querySelector(".editor-background");

    function editorBackgroundEventListeners() {
      editorBackground.addEventListener("click", () => {
        hideTodoEditor();
      });
    }

    editorBackgroundEventListeners();

    function addTodoListEventListeners() {
      func = addTodo;
      addTask.addEventListener("click", () => {
        func = addTodo;
        if (storage.getCurrentTodoList()) {
          editorBackground.style.height = `${document.body.scrollHeight}px`;
          editorBackground.style.display = "block";
          todoEditor.style.display = "block";

          inputTitle.focus();
        } else {
          alert("Choose To-do list first");
        }
      });
    }

    function todoEditorEventListeners() {
      todoEditorForm.addEventListener("submit", func);

      const cancelButt = document.querySelector(".cancel");
      cancelButt.addEventListener("click", () => {
        hideTodoEditor();
      });

      function inputDescriptionEventListeners() {
        const offset =
          inputDescription.offsetHeight - inputDescription.clientHeight;

        inputDescription.addEventListener("input", () => {
          inputDescription.style.height = "auto";

          inputDescription.style.height = `${
            inputDescription.scrollHeight + offset
          }px`;
        });
      }

      inputDescriptionEventListeners();
    }

    addTodoListEventListeners();
    todoEditorEventListeners();
  }

  function initializeComponent(parentComponent) {
    DOM.createStaticElements(parentComponent);
    initializeEventListeners();

    storage.getArrayofTodos().forEach((todo) => {
      const date = format(parseISO(todo.dueDate), "PPPP");
      DOM.createToDo(todo, date);
      todoEventListeners(todo.id);
    });
  }

  function getNotified() {
    while (document.querySelector(".list-of-todos").firstChild) {
      document.querySelector(".list-of-todos").firstChild.remove();
    }

    storage.getArrayofTodos().forEach((todo) => {
      const date = format(parseISO(todo.dueDate), "PPPP");
      DOM.createToDo(todo, date);
      todoEventListeners(todo.id);
    });
  }

  return {
    initializeComponent,
    getNotified,
  };
}
