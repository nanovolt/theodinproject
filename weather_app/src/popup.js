export default function Popup(city, message) {
  const popup = document.querySelector(".popup");
  popup.style.visibility = "visible";
  popup.style.opacity = "1";
  popup.innerText = `${city} ${message}`;

  setTimeout(() => {
    popup.style.opacity = "0";
    popup.style.visibility = "hidden";
  }, 1000);
}
