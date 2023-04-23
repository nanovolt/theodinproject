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

    const deleteButton = todoList.querySelector(".delete-todo-list");

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

        observable.notify();
      });
    }

    createTodoListEventListeners();

    function createEditButtonEventListeners(button) {
      function createSpanAndEdit(editValue) {
        todoListEditInput.remove();
        okButton.remove();

        DOM.createEditButton(todoList);
        DOM.createTodoListNameSpan(todoList, editValue);

        todoListName = todoList.querySelector(".todo-list-name");
        editButton = todoList.querySelector(".edit-todo-list-name");
        createEditButtonEventListeners(editButton);
      }

      function createInputAndOk() {
        todoListName.remove();
        button.remove();

        DOM.createOkButton(todoList);
        DOM.createEditInput(todoList, valueBeforeEdit);

        todoListEditInput = todoList.querySelector(".todo-list-edit-input");
        okButton = todoList.querySelector(".ok-edit-todo-list-name");
      }

      button.addEventListener("click", (e) => {
        e.stopPropagation();
        valueBeforeEdit = todoListName.innerText;
        createInputAndOk();

        okButton.addEventListener("click", (ev) => {
          ev.stopPropagation();

          const { top, left, height } =
            todoListEditInput.getBoundingClientRect();

          const editValue = todoListEditInput.value
            .trim()
            .split(/[\s]+/)
            .join(" ");

          if (editValue) {
            if (storage.isNotPresent(editValue)) {
              storage.renameTodoList(valueBeforeEdit, editValue);
              if (storage.getCurrentTodoList() === valueBeforeEdit) {
                storage.setCurrentTodoList(editValue);
              }
              createSpanAndEdit(editValue);
            } else if (editValue === valueBeforeEdit) {
              createSpanAndEdit(valueBeforeEdit);
            } else {
              todoListEditInput.focus();
              DOM.displayPopup(
                "Already have:",
                editValue,
                window.scrollY + top + height + 8,
                left
              );
            }
          } else {
            createSpanAndEdit(valueBeforeEdit);
          }
        });

        todoListEditInput.focus();

        todoListEditInput.addEventListener("click", (ev) => {
          ev.stopPropagation();
        });

        todoListEditInput.addEventListener("keydown", (ev) => {
          const { top, left, height } =
            todoListEditInput.getBoundingClientRect();

          const editValue = todoListEditInput.value
            .trim()
            .split(/[\s]+/)
            .join(" ");

          if (ev.key === "Enter") {
            if (editValue) {
              if (storage.isNotPresent(editValue)) {
                storage.renameTodoList(valueBeforeEdit, editValue);
                if (storage.getCurrentTodoList() === valueBeforeEdit) {
                  storage.setCurrentTodoList(editValue);
                }
                createSpanAndEdit(editValue);
              } else if (editValue === valueBeforeEdit) {
                createSpanAndEdit(valueBeforeEdit);
              } else {
                todoListEditInput.focus();

                DOM.displayPopup(
                  "Already have:",
                  editValue,
                  window.scrollY + top + height + 8,
                  left
                );
              }
            } else {
              createSpanAndEdit(valueBeforeEdit);
            }
          }

          if (ev.key === "Escape") {
            createSpanAndEdit(valueBeforeEdit);
          }
        });

        todoListEditInput.addEventListener("blur", (ev) => {
          if (ev.relatedTarget !== todoListEditInput.nextSibling) {
            createSpanAndEdit(valueBeforeEdit);
          }
        });
      });
    }

    createEditButtonEventListeners(editButton);

    function deleteTodoListEventListeners() {
      deleteButton.addEventListener("click", (e) => {
        const { top, left, height } = deleteButton.getBoundingClientRect();

        e.stopPropagation();

        storage.deleteTodoList(todoListName.innerText);
        if (todoList.classList.contains("current")) {
          storage.setCurrentTodoList("");
        }
        todoList.remove();

        observable.notify();

        DOM.displayPopup(
          "Deleted:",
          todoListName.innerText,
          window.scrollY + top + height + 8,
          left
        );

        if (storage.getArrayOfTodoLists().length === 0) {
          storage.addTodoList("Default");
          DOM.createTodoList("Default", isTodoListCurrent("Default"));

          todoListEventListeners(document.querySelector(".todo-list"));
        }
      });
    }

    deleteTodoListEventListeners();
  }

  function initializeEventListeners() {
    const todoListNameInput = document.querySelector(".todo-list-name-input");
    const addTodoList = document.querySelector(".add-todo-list");

    function addTodoListEventListeners() {
      addTodoList.addEventListener("click", () => {
        const { top, left, height } = todoListNameInput.getBoundingClientRect();

        const inputValue = todoListNameInput.value
          .trim()
          .split(/[\s]+/)
          .join(" ");

        if (inputValue) {
          if (storage.isNotPresent(inputValue)) {
            storage.addTodoList(inputValue);

            // DOM.createTodoList(inputValue, isTodoListCurrent(inputValue));
            DOM.createTodoList(inputValue, false);

            todoListEventListeners(
              document.querySelectorAll(".todo-list:nth-last-of-type(1)")[0]
            );

            DOM.displayPopup(
              "Added:",
              inputValue,
              window.scrollY + top + height + 8,
              left
            );

            todoListNameInput.value = "";
          } else {
            todoListNameInput.value = inputValue;
            todoListNameInput.focus();

            DOM.displayPopup(
              "Already have:",
              inputValue,
              window.scrollY + top + height + 8,
              left
            );
          }
        }
      });
    }

    function todoListNameInputEventListeners() {
      todoListNameInput.addEventListener("keydown", (e) => {
        const { top, left, height } = todoListNameInput.getBoundingClientRect();

        const inputValue = todoListNameInput.value
          .trim()
          .split(/[\s]+/)
          .join(" ");

        if (inputValue && e.key === "Enter") {
          if (storage.isNotPresent(inputValue)) {
            storage.addTodoList(inputValue);

            // DOM.createTodoList(inputValue, isTodoListCurrent(inputValue));
            DOM.createTodoList(inputValue, false);

            todoListEventListeners(
              document.querySelectorAll(".todo-list:nth-last-of-type(1)")[0]
            );

            DOM.displayPopup("Added:", inputValue, top + height + 8, left);

            todoListNameInput.value = "";
          } else {
            DOM.displayPopup(
              "Already have:",
              inputValue,
              window.scrollY + top + height + 8,
              left
            );
          }
        }

        if (e.key === "Escape") {
          todoListNameInput.value = "";
        }
      });

      todoListNameInput.addEventListener("blur", (e) => {
        if (e.relatedTarget !== addTodoList) {
          todoListNameInput.value = "";
        }
      });
    }

    todoListNameInputEventListeners();
    addTodoListEventListeners();
  }

  function initializeComponent(parentComponent) {
    DOM.createStaticElements(parentComponent);
    initializeEventListeners();

    storage.getArrayOfTodoLists().forEach((todoList) => {
      DOM.createTodoList(todoList.name, isTodoListCurrent(todoList.name));
    });

    document.querySelectorAll(".todo-list").forEach((element) => {
      todoListEventListeners(element);
    });
  }

  return { initializeComponent };
}
