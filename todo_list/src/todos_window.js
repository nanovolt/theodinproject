import "./todos_window.css";

export default function TodosWindow(observable, storage) {
  function appendTodoList(name, currentName) {
    const todoListElem = document.createElement("li");
    todoListElem.classList.add("todo-list");
    if (name === currentName) todoListElem.classList.add("current");
    todoListElem.innerText = name;

    const editTodoListName = document.createElement("button");
    editTodoListName.classList.add("edit-todo-list-name");
    editTodoListName.innerText = "Edit";

    const list = document.querySelector(".list-of-todos");
    list.appendChild(todoListElem);
    list.appendChild(editTodoListName);
  }

  function update() {
    // const arrayOfTodoLists = storage.getArrayOfTodoLists();
    // arrayOfTodoLists.forEach((item) => {});
  }

  function todoListEventListeners(todoList) {
    todoList.addEventListener("click", () => {
      storage.setCurrentTodoList(todoList.innerText);
      if (document.querySelector(".current")) {
        document.querySelector(".current").classList.remove("current");
      }
      todoList.classList.add("current");
    });
  }

  function addTodoList() {
    const inputFormEl = document.querySelector(".todo-list-name-input");

    if (inputFormEl.value && storage.isNotPresent(inputFormEl.value)) {
      storage.addTodoList(inputFormEl.value);
      appendTodoList(inputFormEl.value, "");
      // console.log(document.querySelectorAll(".todo-list:nth-last-of-type(1)"));
      todoListEventListeners(
        document.querySelectorAll(".todo-list:nth-last-of-type(1)")[0]
      );
    }
  }

  function deleteTodoList() {
    const current = document.querySelector(".current");
    if (current) {
      storage.deleteTodoList(current.innerText);
      current.nextElementSibling.remove();
      current.remove();
    }

    if (storage.getArrayOfTodoLists().length === 0) {
      storage.setCurrentTodoList("Default");
      storage.addTodoList("Default");
      appendTodoList("Default");
      todoListEventListeners(document.querySelector(".todo-list"));
    }
  }

  function getNotified() {
    update();
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

    function DeleteTodoListEventListeners() {
      const addTodoListButton = document.querySelector(".delete-todo-list");
      addTodoListButton.addEventListener("click", () => {
        deleteTodoList();
      });
    }

    function EditTodoListNameEventListeners() {
      const editTodoListName = document.querySelectorAll(
        ".edit-todo-list-name"
      );

      editTodoListName.forEach((butt) => {
        butt.addEventListener("click", () => {
          console.log(butt.previousElementSibling);
          const inputEdit = document.createElement("input");
          inputEdit.value = butt.previousElementSibling.innerText;
          butt.parentNode.replaceChild(inputEdit, butt.previousElementSibling);
          inputEdit.focus();
          inputEdit.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
              addTodoList();
            }
          });
        });
      });
    }

    const allTodoLists = document.querySelectorAll(".todo-list");
    allTodoLists.forEach((item) => {
      todoListEventListeners(item);
    });

    AddTodoListEventListeners();
    DeleteTodoListEventListeners();
    EditTodoListNameEventListeners();
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

    storage.getArrayOfTodoLists().forEach((item) => {
      appendTodoList(item.name, storage.getCurrentTodoList());
    });

    initializeEventListeners();
  }

  return { initializeComponent, getNotified };
}
