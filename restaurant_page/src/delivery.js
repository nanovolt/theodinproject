import "./index.css";
import "./delivery.css";

export default function Delivery() {
  const deliveryWrapper = document.createElement("div");
  deliveryWrapper.classList.add("delivery-wrapper");
  deliveryWrapper.innerText = "Delivery";
  return deliveryWrapper;
}
