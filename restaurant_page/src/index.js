import "./index.css";
import Header from "./header";
import Menu from "./menu";

console.log("index.js");
document.body.prepend(Header());

const content = document.querySelector("#content");

content.appendChild(Menu());
