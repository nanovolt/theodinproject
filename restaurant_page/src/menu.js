import "./index.css";
import "./menu.css";

export default function Menu() {
  const menuWrapper = document.createElement("div");
  menuWrapper.classList.add("menu-wrapper");
  menuWrapper.innerText = "Menu";
  return menuWrapper;
}
