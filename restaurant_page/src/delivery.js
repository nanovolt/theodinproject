import "./index.css";
import "./delivery.css";

export default function Delivery() {
  const component = document.createElement("div");
  component.classList.add("delivery-wrapper");

  const delivery = document.createElement("div");
  delivery.classList.add("delivery");

  const statusContainer = document.createElement("div");
  statusContainer.classList.add("status-container");

  const statusTitle = document.createElement("div");
  const statusEstimate = document.createElement("div");
  const statusOrderTitle = document.createElement("div");

  const statusOrderList = document.createElement("div");
  statusOrderList.classList.add("order-list");

  const statusOrderItem = document.createElement("div");
  statusOrderItem.classList.add("item1");

  const statusOrderItemTitle = document.createElement("div");
  const statusOrderAmount = document.createElement("div");
  const statusOrderTotal = document.createElement("div");

  const statusOrderItem2 = document.createElement("div");
  statusOrderItem2.classList.add("item2");

  const statusOrderItemTitle2 = document.createElement("div");
  const statusOrderAmount2 = document.createElement("div");
  const statusOrderTotal2 = document.createElement("div");

  const statusTotalPaid = document.createElement("div");

  statusTitle.innerText = "Status: Delivering...";
  statusEstimate.innerText = "Estimate Time: 1 hour 24 minutes";
  statusOrderTitle.innerText = "Your Order:";

  statusContainer.appendChild(statusTitle);
  statusContainer.appendChild(statusEstimate);

  statusOrderItemTitle.innerText = "Sandwich";
  statusOrderAmount.innerText = "7.99 x 2";
  statusOrderTotal.innerText = "= $ 15.98";
  statusOrderItem.appendChild(statusOrderItemTitle);
  statusOrderItem.appendChild(statusOrderAmount);
  statusOrderItem.appendChild(statusOrderTotal);

  statusOrderItemTitle2.innerText = "Pizza";
  statusOrderAmount2.innerText = "11.99 x 1";
  statusOrderTotal2.innerText = "= $ 11.99";
  statusOrderItem2.appendChild(statusOrderItemTitle2);
  statusOrderItem2.appendChild(statusOrderAmount2);
  statusOrderItem2.appendChild(statusOrderTotal2);

  statusTotalPaid.innerText = "Total paid: $ 27.97";

  statusOrderList.appendChild(statusOrderTitle);
  statusOrderList.appendChild(statusOrderItem);
  statusOrderList.appendChild(statusOrderItem2);
  const hr = document.createElement("hr");
  statusOrderList.appendChild(hr);
  statusOrderList.appendChild(statusTotalPaid);

  delivery.appendChild(statusContainer);
  delivery.appendChild(statusOrderList);

  component.appendChild(delivery);
  return { component };
}
