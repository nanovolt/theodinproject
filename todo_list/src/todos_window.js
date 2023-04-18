import "./todos_window.css";
import * as DOM from "./todos_window_DOM";

export default function TodosWindow(observable, storage) {
  function displayPopup(message, inputValue) {
    const popup = document.querySelector(".add-todo-list-popup");
    if (message === "Already have:") {
      popup.style.cssText = `border-right: 8px solid red;`;
    } else {
      popup.style.cssText = `border-right: 8px solid green;`;
    }

    const { height } = document
      .querySelector(".todo-list-name-input")
      .getBoundingClientRect();

    document.querySelector(".add-todo-list-popup").style.top = `${height}px`;
    popup.style.visibility = "visible";
    popup.innerText = `${message} ${inputValue}`;
    popup.style.opacity = "1";

    setTimeout(() => {
      popup.style.opacity = "0";
      popup.style.visibility = "hidden";
    }, 1000);
  }

  function isTodoListCurrent(todoListName) {
    return todoListName === storage.getCurrentTodoList();
  }

  function isInputValid(value) {
    if (!value.replace(/\s/g, "").length) {
      console.log(
        "string only contains whitespace (ie. spaces, tabs or line breaks)"
      );
      return false;
    }
    return true;
  }

  function todoListEventListeners(todoList) {
    let valueBeforeEdit;

    todoList.addEventListener("click", () => {
      console.log("todoList click", todoList);
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
      // e.stopPropagation();

      valueBeforeEdit = todoList.firstChild.innerText;

      DOM.createEditInput(todoList, valueBeforeEdit);
      DOM.createOkButton(todoList);

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

  function deleteTodoList() {
    const current = document.querySelector(".current");
    if (current) {
      console.log(current.firstChild.innerText);
      storage.deleteTodoList(current.firstChild.innerText);
      current.remove();
      displayPopup("Deleted:", current.firstChild.innerText);
    }

    if (storage.getArrayOfTodoLists().length === 0) {
      storage.addTodoList("Default");
      DOM.createTodoList("Default", isTodoListCurrent("Default"));

      todoListEventListeners(document.querySelector(".todo-list"));
    }
  }

  function initializeEventListeners() {
    // let clickTarget;
    function addTodoListEventListeners() {
      // window.addEventListener("click", (e) => {
      //   clickTarget = e.target;
      // });
      const nameInput = document.querySelector(".todo-list-name-input");
      let inputValue = "";

      document.querySelector(".add-todo-list").addEventListener("click", () => {
        // inputValue = nameInput.value;
        // e.preventDefault();
        console.log("add click", inputValue);
        if (inputValue) {
          if (storage.isNotPresent(inputValue)) {
            storage.addTodoList(inputValue.trim());
            DOM.createTodoList(inputValue, isTodoListCurrent(inputValue));
            todoListEventListeners(
              document.querySelectorAll(".todo-list:nth-last-of-type(1)")[0]
            );

            displayPopup("Added:", inputValue);
            inputValue = "";
          } else {
            nameInput.value = inputValue;
            displayPopup("Already have:", inputValue);
            nameInput.focus();
          }
        }
      });

      nameInput.addEventListener("keydown", (e) => {
        inputValue = nameInput.value;
        if (inputValue && e.key === "Enter") {
          if (storage.isNotPresent(inputValue)) {
            nameInput.value = "";

            storage.addTodoList(inputValue.trim());
            DOM.createTodoList(inputValue, isTodoListCurrent(inputValue));
            todoListEventListeners(
              document.querySelectorAll(".todo-list:nth-last-of-type(1)")[0]
            );

            displayPopup("Added:", inputValue);
          } else {
            displayPopup("Already have:", inputValue);
          }
        }
        if (e.key === "Escape") {
          nameInput.value = "";
        }
      });

      nameInput.addEventListener("blur", () => {
        inputValue = nameInput.value;
        nameInput.value = "";

        // console.log("blur clickTarget:", clickTarget);

        // if (clickTarget === nameInput.nextElementSibling) {
        // }
        // if (storage.isNotPresent(inputValue)) {
        //   nameInput.value = inputValue;
        // }
      });
    }

    document
      .querySelector(".delete-todo-list")
      .addEventListener("click", () => {
        deleteTodoList();
      });

    document.querySelectorAll(".todo-list").forEach((element) => {
      todoListEventListeners(element);
    });

    addTodoListEventListeners();
  }

  function initializeComponent(parentComponent) {
    DOM.createStaticElements(parentComponent);

    storage.getArrayOfTodoLists().forEach((todoList) => {
      DOM.createTodoList(todoList.name, isTodoListCurrent(todoList.name));
    });

    initializeEventListeners();
  }

  return { initializeComponent };
}
