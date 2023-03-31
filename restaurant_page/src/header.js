import "./index.css";
import "./header.css";

export default function Header() {
  const headerWrapper = document.createElement("div");
  headerWrapper.classList.add("header-wrapper");

  const header = document.createElement("div");
  header.classList.add("header");

  const menu1 = document.createElement("button");
  menu1.classList.add("header-menu");
  menu1.classList.add("menu");
  menu1.innerText = "Menu";

  const menu2 = document.createElement("button");
  menu2.classList.add("header-menu");
  menu1.classList.add("reservation");
  menu2.innerText = "Reservation";

  const menu3 = document.createElement("button");
  menu3.classList.add("header-menu");
  menu3.classList.add("delivery");
  menu3.innerText = "Delivery";

  header.appendChild(menu1);
  header.appendChild(menu2);
  header.appendChild(menu3);
  headerWrapper.appendChild(header);
  return headerWrapper;
}
