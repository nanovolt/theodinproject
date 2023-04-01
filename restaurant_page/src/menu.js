import "./index.css";
import "./menu.css";

export default function Menu() {
  const component = document.createElement("div");
  component.classList.add("menu-wrapper");

  const menu = document.createElement("div");
  menu.classList.add("menu");

  const menuList = [];

  for (let i = 0; i < 4; i += 1) {
    const item = document.createElement("div");
    item.classList.add("menu-item");
    const itemTitle = document.createElement("div");
    const itemImage = document.createElement("img");
    const itemPrice = document.createElement("div");
    const itemOrderButton = document.createElement("button");
    itemTitle.classList.add("title");
    itemImage.classList.add("image");
    itemPrice.classList.add("price");
    itemOrderButton.classList.add("order");
    itemOrderButton.innerText = "Order";
    item.appendChild(itemTitle);
    item.appendChild(itemImage);
    item.appendChild(itemPrice);
    item.appendChild(itemOrderButton);
    menu.appendChild(item);
    menuList.push(item);
  }

  menuList[0].childNodes[0].innerText = "Burger";
  menuList[0].childNodes[2].innerText = "$ 8.99";
  menuList[0].childNodes[1].src = "src/burger.jpg";

  menuList[1].childNodes[0].innerText = "Pizza";
  menuList[1].childNodes[2].innerText = "$ 11.99";
  menuList[1].childNodes[1].src = "src/pizza.jpg";

  menuList[2].childNodes[0].innerText = "Sandwich";
  menuList[2].childNodes[2].innerText = "$ 7.99";
  menuList[2].childNodes[1].src = "src/sandwich.jpeg";

  menuList[3].childNodes[0].innerText = "Hot Dog";
  menuList[3].childNodes[2].innerText = "$ 4.99";
  menuList[3].childNodes[1].src = "src/hotdog.jpg";

  component.appendChild(menu);
  return { component };
}
