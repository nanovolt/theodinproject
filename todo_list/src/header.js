import "./header.css";

export default function Header() {
  function initializeEventListeners() {}

  function initializeComponent(parentComponent) {
    const component = document.createElement("header");
    component.innerText = "To-do List App";

    parentComponent.appendChild(component);
  }

  return { initializeComponent, initializeEventListeners };
}
