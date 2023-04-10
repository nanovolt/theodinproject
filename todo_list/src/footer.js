import "./footer.css";

export default function Footer() {
  function initializeComponent() {
    const component = document.createElement("footer");
    component.innerHTML = "To-Do List App 2023";

    document.body.appendChild(component);
  }

  return { initializeComponent };
}
