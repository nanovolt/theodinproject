import "./index.css";
import "./reservation.css";

export default function Reservation() {
  const component = document.createElement("div");
  component.classList.add("reservation-wrapper");

  const reservation = document.createElement("div");
  reservation.classList.add("reservation");

  for (let i = 0; i < 8; i += 1) {
    const place = document.createElement("div");
    const placeTitle = document.createElement("div");
    const placeStatus = document.createElement("div");
    const ReserveButton = document.createElement("button");
    place.classList.add("place");
    placeTitle.classList.add("place-title");
    placeStatus.classList.add("status");
    ReserveButton.classList.add("reserve");
    placeTitle.innerText = `Table ${i + 1}`;
    placeStatus.innerText = "Free";
    ReserveButton.innerText = "Reserve";

    place.appendChild(placeTitle);
    place.appendChild(placeStatus);
    place.appendChild(ReserveButton);
    reservation.appendChild(place);
  }
  component.appendChild(reservation);
  return { component };
}
