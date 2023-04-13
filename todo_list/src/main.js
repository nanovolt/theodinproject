import "./main.css";

export default function Main() {
  function initializeEventListeners() {}

  function initializeComponent(parentComponent) {
    const component = document.createElement("div");
    component.classList.add("main-wrapper");

    const main = document.createElement("main");

    component.appendChild(main);
    parentComponent.appendChild(component);
  }

  return { initializeComponent, initializeEventListeners };
}
