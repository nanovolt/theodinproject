import "./todos_window.css";
import * as DOM from "./todos_window_DOM";

export default function TodosWindow(observable, storage) {
  function todoListEventListeners(todoList) {
    let valueBeforeEdit;

    todoList.addEventListener("click", () => {
      if (!todoList.lastChild.classList.contains("editing-name")) {
        storage.setCurrentTodoList(todoList.firstChild.innerText);
        if (document.querySelector(".current")) {
          document.querySelector(".current").classList.remove("current");
        }
        todoList.classList.add("current");
      }
    });

    function change(value) {
      DOM.createTodoListNameSpan(value);
      DOM.createEditButton();
    }

    // if clicked on Edit
    function editOkEventListeners() {}
    editOkEventListeners();

    todoList.lastChild.addEventListener("click", (e) => {
      e.stopPropagation();

      valueBeforeEdit = todoList.firstChild.innerText;

      createEditInput(valueBeforeEdit);
      createOkButton();

      todoList.lastChild.addEventListener("click", () => {
        console.log("pressed OK, acceptChanges()");
        change(todoList.firstChild.value);
      });

      todoList.firstChild.focus();

      todoList.firstChild.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          console.log("pressed Enter, acceptChanges()");
          change(todoList.firstChild.value);
        }
        if (ev.key === "Escape") {
          console.log("pressed Escape, resetChanges()");
          change(valueBeforeEdit);
          console.log("activeElement:", document.activeElement);
        }
      });

      todoList.firstChild.addEventListener("blur", () => {
        console.log("editInput blur", e.target);
        change(valueBeforeEdit);
      });
    });
  }

  function addTodoList() {
    const inputFormEl = document.querySelector(".todo-list-name-input");

    if (inputFormEl.value && storage.isNotPresent(inputFormEl.value)) {
      storage.addTodoList(inputFormEl.value);
      appendTodoList(inputFormEl.value, "");

      todoListEventListeners(
        document.querySelectorAll(".todo-list:nth-last-of-type(1)")[0]
      );

      // editTodoListNameEventListeners(
      //   document.querySelectorAll(".todo-list:nth-last-of-type(1)")[0].lastChild
      // );
    }
  }

  function deleteTodoList() {
    const current = document.querySelector(".current");
    if (current) {
      storage.deleteTodoList(current.firstChild.innerText);
      current.remove();
    }

    if (storage.getArrayOfTodoLists().length === 0) {
      storage.addTodoList("Default");
      appendTodoList("Default");
      todoListEventListeners(document.querySelector(".todo-list"));
    }
  }

  function initializeEventListeners() {
    function AddTodoListEventListeners() {
      document.querySelector(".add-todo-list").addEventListener("click", () => {
        addTodoList();
      });

      const nameInput = document.querySelector(".todo-list-name-input");
      nameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          addTodoList();
        }
        if (e.key === "Escape") {
          nameInput.value = "";
        }
      });

      // nameInput.addEventListener("blur", () => {
      //   nameInput.value = "";
      // });
    }

    document
      .querySelector(".delete-todo-list")
      .addEventListener("click", () => {
        deleteTodoList();
      });
    document.querySelectorAll(".todo-list").forEach((element) => {
      todoListEventListeners(element);
      // console.log(element);
    });
    AddTodoListEventListeners();
  }

  function initializeComponent(parentComponent) {
    const component = document.createElement("div");
    component.classList.add("todos-window");

    const todoListInputContainer = document.createElement("div");
    todoListInputContainer.classList.add("todo-list-input-container");

    const todoListInput = document.createElement("input");
    todoListInput.classList.add("todo-list-name-input");

    const addTodoListButton = document.createElement("button");
    addTodoListButton.classList.add("add-todo-list");
    addTodoListButton.innerText = "Add";

    const deleteTodoListButton = document.createElement("button");
    deleteTodoListButton.classList.add("delete-todo-list");
    deleteTodoListButton.innerText = "Delete";

    const listOfTodos = document.createElement("ul");
    listOfTodos.classList.add("list-of-todos");

    todoListInputContainer.appendChild(todoListInput);
    todoListInputContainer.appendChild(addTodoListButton);
    todoListInputContainer.appendChild(deleteTodoListButton);

    component.appendChild(todoListInputContainer);
    component.appendChild(listOfTodos);

    parentComponent.appendChild(component);

    storage.getArrayOfTodoLists().forEach((todoList) => {
      appendTodoList(todoList.name, storage.getCurrentTodoList());
    });

    initializeEventListeners();
  }

  return { initializeComponent };
}
