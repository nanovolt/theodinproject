import "./popup.css";

export default function Popup(message) {
  const popup = document.querySelector(".popup");
  // popup.style.visibility = "visible";
  popup.classList.add("popup-show");
  popup.innerText = message;

  setTimeout(() => {
    // popup.style.visibility = "hidden";
    popup.classList.remove("popup-show");
  }, 5000);
}
