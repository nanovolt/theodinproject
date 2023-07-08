import "./App.css";
import { Component } from "react";
import Editor from "./components/Editor";
import ReactToPrint from "react-to-print";
import CV from "./components/CV";
import uniqid from "uniqid";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personal: {
        name: "",
        surname: "",
        photo: "",
        title: "",
        description: "",
        email: "",
        phone: "",
      },
      education: [],
      experience: [],
      personalProjects: [],
    };
    this.componentRef = null;
  }

  delete = (photo = "") => {
    this.setState({ personal: null });
  };

  deleteArray = (index, category) => {
    // console.log("app remove array index:", index);
    // console.log("app remove array category:", category);

    this.setState({
      [category]: this.state[category].filter((field, i) => i !== index),
    });
  };

  add = () => {
    this.setState({
      personal: {
        name: "",
        surname: "",
        photo: "",
        title: "",
        description: "",
        email: "",
        phone: "",
      },
    });
  };

  addArray = (category) => {
    switch (category) {
      case "education":
        // console.log("added education");
        this.setState((prev) => ({
          education: prev.education.concat({
            id: uniqid(),
            school: "",
            location: "",
            degree: "",
            start: "",
            finish: "",
          }),
        }));
        break;

      case "experience":
        this.setState((prev) => ({
          experience: prev.experience.concat({
            id: uniqid(),
            company: "",
            location: "",
            position: "",
            tasks: "",
            start: "",
            finish: "",
          }),
        }));
        break;
      default:
      // console.log("added none");
    }
    // console.log("app add array category:", category);
  };

  edit = (category, field, value, index, arrI) => {
    // console.log("edit category:", category);
    // console.log("edit field:", field);

    this.setState((prevState) => ({
      [category]: {
        ...prevState[category],
        [field]: value,
      },
    }));

    // this.setState({ [category]: { [field]: value } });
  };

  editArray = (category, field, value, inputIndex, arrI) => {
    // console.log("edit array");
    // console.log("category:", category);
    // console.log("field:", field);
    // console.log("value:", value);
    // console.log("inputIndex:", inputIndex);
    // console.log("arrI:", arrI);

    this.setState({
      [category]: this.state[category].map((item, i) => {
        if (i === arrI) {
          // console.log("item:", item);
          item[field] = value;
        }
        return item;
      }),
    });
  };

  upload = (a) => {
    console.log("upload:", a);

    this.edit("personal", "photo", a);
  };

  render = () => {
    return (
      <div className="App">
        {/* <button onClick={print}>print</button> */}
        {/* <Editor></Editor> */}

        <Editor
          edit={this.edit}
          editArray={this.editArray}
          data={this.state}
          add={this.add}
          addArray={this.addArray}
          delete={this.delete}
          deleteArray={this.deleteArray}
          upload={this.upload}
        />
        <CV ref={(el) => (this.componentRef = el)} data={this.state}></CV>

        <div className="pdf">
          <ReactToPrint
            trigger={() => {
              return <button>Print</button>;
            }}
            content={() => this.componentRef}
            documentTitle={document.title}
          />
        </div>
      </div>
    );
  };
}

export default App;
