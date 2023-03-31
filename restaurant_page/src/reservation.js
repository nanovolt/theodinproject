import "./index.css";
import "./reservation.css";

export default function Reservation() {
  const reservationWrapper = document.createElement("div");
  reservationWrapper.classList.add("reservation-wrapper");
  reservationWrapper.innerText = "Reservation";
  return reservationWrapper;
}
