import "./footer.css";

export default function Footer() {
  const component = document.createElement("footer");
  component.innerHTML = "Giga Calories Foods LLC &copy 2023";
  return { component };
}
