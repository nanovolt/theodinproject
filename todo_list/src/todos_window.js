import "./todos_window.css";
import * as DOM from "./todos_window_DOM";

export default function TodosWindow(observable, storage) {
  function isTodoListCurrent(todoListName) {
    return todoListName === storage.getCurrentTodoList();
  }

  function todoListEventListeners(todoList) {
    let todoListName = todoList.querySelector(".todo-list-name");
    let editButton = todoList.querySelector(".edit-todo-list-name");
    let todoListEditInput = todoList.querySelector(".todo-list-edit-input");
    let okButton = todoList.querySelector(".ok-edit-todo-list-name");

    let valueBeforeEdit;

    function createTodoListEventListeners() {
      todoList.addEventListener("click", () => {
        if (!editButton.classList.contains("editing-name")) {
          storage.setCurrentTodoList(todoListName.innerText);

          if (document.querySelector(".current")) {
            document.querySelector(".current").classList.remove("current");
          }
          todoList.classList.add("current");
        }
      });
    }
    createTodoListEventListeners();

    function createEditButtonEventListeners(button) {
      button.addEventListener("click", (e) => {
        console.log("edit");
        e.stopPropagation();

        valueBeforeEdit = todoListName.innerText;

        todoListName.remove();
        button.remove();
        DOM.createEditInput(todoList, valueBeforeEdit);
        DOM.createOkButton(todoList);
        todoListEditInput = todoList.querySelector(".todo-list-edit-input");
        okButton = todoList.querySelector(".ok-edit-todo-list-name");

        okButton.addEventListener("click", () => {
          console.log("pressed OK, acceptChanges()");

          todoListEditInput.remove();
          okButton.remove();
          DOM.createTodoListNameSpan(todoList, valueBeforeEdit);
          DOM.createEditButton(todoList);
          todoListName = todoList.querySelector(".todo-list-name");
          editButton = todoList.querySelector(".edit-todo-list-name");

          createEditButtonEventListeners(editButton);
        });

        todoListEditInput.focus();

        todoListEditInput.addEventListener("keydown", (ev) => {
          if (ev.key === "Enter") {
            console.log("pressed Enter, acceptChanges()");

            todoListEditInput.remove();
            okButton.remove();
            DOM.createTodoListNameSpan(todoList, valueBeforeEdit);
            DOM.createEditButton(todoList);
            todoListName = todoList.querySelector(".todo-list-name");
            editButton = todoList.querySelector(".edit-todo-list-name");

            createEditButtonEventListeners(editButton);
          }

          if (ev.key === "Escape") {
            console.log("pressed Escape, resetChanges()");

            todoListEditInput.remove();
            okButton.remove();
            DOM.createTodoListNameSpan(todoList, valueBeforeEdit);
            DOM.createEditButton(todoList);
            todoListName = todoList.querySelector(".todo-list-name");
            editButton = todoList.querySelector(".edit-todo-list-name");

            createEditButtonEventListeners(editButton);
          }
        });

        todoListEditInput.addEventListener("blur", () => {
          console.log("editInput blur", e.target);

          todoListEditInput.remove();
          okButton.remove();
          DOM.createTodoListNameSpan(todoList, valueBeforeEdit);
          DOM.createEditButton(todoList);
          todoListName = todoList.querySelector(".todo-list-name");
          editButton = todoList.querySelector(".edit-todo-list-name");

          createEditButtonEventListeners(editButton);
        });
      });
    }

    createEditButtonEventListeners(editButton);
  }

  function initializeEventListeners() {
    const todoListNameInput = document.querySelector(".todo-list-name-input");
    const addTodoList = document.querySelector(".add-todo-list");
    const deleteTodoList = document.querySelector(".delete-todo-list");

    let inputValue = "";

    function addTodoListEventListeners() {
      addTodoList.addEventListener("click", () => {
        inputValue = inputValue.trim().split(/[\s]+/).join(" ");

        if (inputValue) {
          if (storage.isNotPresent(inputValue)) {
            storage.addTodoList(inputValue.trim());

            DOM.createTodoList(inputValue, isTodoListCurrent(inputValue));
            todoListEventListeners(
              document.querySelectorAll(".todo-list:nth-last-of-type(1)")[0]
            );

            DOM.displayPopup("Added:", inputValue);
            inputValue = "";
          } else {
            todoListNameInput.value = inputValue;
            todoListNameInput.focus();
            DOM.displayPopup("Already have:", inputValue);
          }
        }
      });
    }

    function todoListNameInputEventListeners() {
      todoListNameInput.addEventListener("keydown", (e) => {
        inputValue = todoListNameInput.value;
        inputValue = inputValue.trim().split(/[\s]+/).join(" ");

        if (inputValue && e.key === "Enter") {
          if (storage.isNotPresent(inputValue)) {
            todoListNameInput.value = "";

            storage.addTodoList(inputValue.trim());
            DOM.createTodoList(inputValue, isTodoListCurrent(inputValue));
            todoListEventListeners(
              document.querySelectorAll(".todo-list:nth-last-of-type(1)")[0]
            );

            DOM.displayPopup("Added:", inputValue);
          } else {
            DOM.displayPopup("Already have:", inputValue);
          }
        }

        if (e.key === "Escape") {
          todoListNameInput.value = "";
        }
      });

      todoListNameInput.addEventListener("blur", () => {
        inputValue = todoListNameInput.value;
        todoListNameInput.value = "";
      });
    }

    function deleteTodoListEventListeners() {
      deleteTodoList.addEventListener("click", () => {
        const current = document.querySelector(".current");

        if (current) {
          storage.deleteTodoList(current.firstChild.innerText);
          current.remove();
          DOM.displayPopup("Deleted:", current.firstChild.innerText);
        }

        if (storage.getArrayOfTodoLists().length === 0) {
          storage.addTodoList("Default");
          DOM.createTodoList("Default", isTodoListCurrent("Default"));

          todoListEventListeners(document.querySelector(".todo-list"));
        }
      });
    }

    todoListNameInputEventListeners();
    addTodoListEventListeners();
    deleteTodoListEventListeners();
  }

  function initializeComponent(parentComponent) {
    DOM.createStaticElements(parentComponent);

    storage.getArrayOfTodoLists().forEach((todoList) => {
      DOM.createTodoList(todoList.name, isTodoListCurrent(todoList.name));
    });

    initializeEventListeners();

    document.querySelectorAll(".todo-list").forEach((element) => {
      todoListEventListeners(element);
    });
  }

  return { initializeComponent };
}
