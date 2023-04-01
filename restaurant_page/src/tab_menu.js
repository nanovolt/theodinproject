import "./index.css";
import "./tab_menu.css";

export default function TabMenu() {
  const component = document.createElement("div");
  component.classList.add("tab-menu-wrapper");

  const tabMenu = document.createElement("div");
  tabMenu.classList.add("tab-menu");

  const menu = document.createElement("button");
  menu.classList.add("tab");
  menu.classList.add("menu-tab");
  menu.innerText = "Menu";

  const reservation = document.createElement("button");
  reservation.classList.add("tab");
  reservation.classList.add("reservation-tab");
  reservation.innerText = "Reservation";

  const delivery = document.createElement("button");
  delivery.classList.add("tab");
  delivery.classList.add("delivery-tab");
  delivery.innerText = "Delivery";

  const tabs = [menu, reservation, delivery];
  tabs.forEach((tab) => tabMenu.appendChild(tab));

  component.appendChild(tabMenu);

  let currentTab;

  function setCurrentTab(i) {
    // console.log(tabs[i].classList);
    currentTab = document.querySelector(`.${tabs[i].classList[1]}`);
    // console.log(currentTab);
    tabs.forEach((tab) => {
      tab.classList.remove("selected");
    });
    currentTab.classList.add("selected");
  }

  return {
    component,
    setCurrentTab,
  };
}
