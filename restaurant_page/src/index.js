import "./index.css";
import TabMenu from "./tab_menu";
import Menu from "./menu";
import Reservation from "./reservation";
import Delivery from "./delivery";
import Footer from "./footer";

const tabMenu = TabMenu();
const footer = Footer();
document.body.prepend(tabMenu.component);
document.body.append(footer.component);
const content = document.querySelector(".content");
const menu = Menu();
const reservation = Reservation();
const delivery = Delivery();

const menuTab = document.querySelector(".menu-tab");

const reservationTab = document.querySelector(".reservation-tab");
const deliveryTab = document.querySelector(".delivery-tab");

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

menuTab.onclick = () => {
  removeAllChildNodes(content);
  tabMenu.setCurrentTab(0);
  content.appendChild(menu.component);
};
menuTab.click();

reservationTab.onclick = () => {
  removeAllChildNodes(content);
  tabMenu.setCurrentTab(1);
  content.appendChild(reservation.component);
};

deliveryTab.onclick = () => {
  removeAllChildNodes(content);
  tabMenu.setCurrentTab(2);
  content.appendChild(delivery.component);
};
