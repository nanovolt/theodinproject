import { Component } from "react";
import "../styles/header.css";

export default class Header extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <h1>CV Builder</h1>
      </header>
    );
  }
}
