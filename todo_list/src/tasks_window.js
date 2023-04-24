import "./tasks_window.css";
import format from "date-fns/format";
import { parseISO } from "date-fns/esm";
import * as DOM from "./tasks_window_DOM";

export default function TasksWindow(observable, storage) {
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

  function readFormData() {
    const todoEditorForm = document.querySelector(".todo-editor-form");

    const formdata = new FormData(todoEditorForm);
    const task = {};
    task.title = formdata.get("title");
    task.description = formdata.get("description");
    task.dueDate = formdata.get("dueDate");
    task.priority = formdata.get("priority");

    task.title = task.title.trim().split(/[\s]+/).join(" ");
    task.description = task.description.trim().split(/[\s]+/).join(" ");

    if (!task.dueDate) {
      task.dueDate = format(parseISO(new Date().toISOString()), "yyyy-MM-dd");
    }

    return task;
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
    const action = todoEditorForm.querySelector(".action");

    const editorBackground = document.querySelector(".editor-background");
    const todoEditor = document.querySelector(".todo-editor");

    editTodo.addEventListener("click", () => {
      const storageTodo = storage.getTodo(id);

      editorBackground.style.height = `${document.body.scrollHeight}px`;
      editorBackground.style.display = "block";

      action.innerText = "Edit";

      // todoEditorForm.addEventListener("submit", formEventHandler);

      todoEditor.style.display = "block";

      inputTitle.value = storageTodo.title;
      inputDescription.value = storageTodo.description;
      inputDescription.style.height = `${inputDescription.scrollHeight}px`;

      // inputDueDate.value = "0001-01-01";
      inputDueDate.value = storageTodo.dueDate;

      const radio = todoEditorForm.querySelector(
        `input[value="${storageTodo.priority}"]`
      );

      radio.checked = true;
      inputTitle.focus();
    });

    deleteTodo.addEventListener("click", () => {
      storage.deleteTodo(id);
      todo.remove();
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

  function initializeEventListeners() {
    const addTodo = document.querySelector(".add-todo");
    const todoEditor = document.querySelector(".todo-editor");
    const todoEditorForm = document.querySelector(".todo-editor-form");
    const inputTitle = todoEditorForm.querySelector(".input-title");
    const inputDescription = todoEditorForm.querySelector(".input-description");
    const editorBackground = document.querySelector(".editor-background");
    const action = todoEditorForm.querySelector(".action");
    const cancelButt = todoEditorForm.querySelector(".cancel");

    function editorBackgroundEventListeners() {
      editorBackground.addEventListener("click", () => {
        hideTodoEditor();
      });
    }

    function addTodoListEventListeners() {
      addTodo.addEventListener("click", () => {
        if (storage.getCurrentTodoList()) {
          editorBackground.style.height = `${document.body.scrollHeight}px`;
          editorBackground.style.display = "block";

          action.innerText = "Add";

          todoEditor.style.display = "block";

          inputTitle.focus();
        } else {
          alert("Choose To-do list first");
        }
      });
    }

    function todoEditorEventListeners() {
      function formEventHandler(e) {
        e.preventDefault();

        if (action.innerText === "Add") {
          const task = readFormData();
          hideTodoEditor();

          // to-do smart id generator
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
        } else {
          console.log("editing");
        }
      }

      todoEditorForm.addEventListener("submit", formEventHandler);

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
    editorBackgroundEventListeners();
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

  return {
    initializeComponent,
    getNotified,
  };
}
