import "./popup.css";

export default function Popup(message) {
  const popup = document.querySelector(".popup");
  popup.classList.add("popup-show");
  popup.innerText = message;

  setTimeout(() => {
    popup.classList.remove("popup-show");
  }, 5000);
}
