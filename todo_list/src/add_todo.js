import "./add_todo.css";

export default function AddTodo() {
  function openTodoEditor() {
    const addTask = document.querySelector(".add-todo");
    const todoEditor = document.querySelector(".todo-editor");
    addTask.addEventListener("click", () => {
      todoEditor.style.display = "block";
    });
  }

  function initializeEventListeners() {
    openTodoEditor();
  }

  function initializeComponent(parentComponent) {
    const component = document.createElement("button");
    component.classList.add("add-todo");
    component.innerText = "Add to-do";
    parentComponent.appendChild(component);
  }

  return { initializeComponent, initializeEventListeners };
}