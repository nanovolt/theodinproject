import "./footer.css";

export default function Footer() {
  function initializeEventListeners() {}

  function initializeComponent(parentComponent) {
    const component = document.createElement("footer");
    component.innerHTML = "To-Do List App 2023";

    parentComponent.appendChild(component);
  }

  return { initializeComponent, initializeEventListeners };
}