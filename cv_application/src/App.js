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
      links: [],
      skills: [],
      education: [],
      experience: [],
      personalProjects: [],
    };
    this.componentRef = null;
  }

  delete = (photo = "") => {
    this.setState({ personal: null });
  };

  deleteArray = (category, index) => {
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
    console.log("add:", category);

    switch (category) {
      case "education":
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

      case "links":
        this.setState((prev) => ({
          links: prev.links.concat({
            id: uniqid(),
            linkName: "",
            link: "",
          }),
        }));
        break;

      case "skills":
        this.setState((prev) => ({
          skills: prev.skills.concat({
            id: uniqid(),
            skill: "",
          }),
        }));
        break;

      case "personalProjects":
        this.setState((prev) => ({
          personalProjects: prev.personalProjects.concat({
            id: uniqid(),
            projectName: "",
            description: "",
            features: "",
            link: "",
          }),
        }));
        break;
      default:
    }
  };

  edit = (category, field, value) => {
    this.setState((prevState) => ({
      [category]: {
        ...prevState[category],
        [field]: value,
      },
    }));
  };

  editArray = (category, field, value, index) => {
    this.setState({
      [category]: this.state[category].map((item, i) => {
        if (i === index) {
          item[field] = value;
        }
        return item;
      }),
    });
  };

  upload = (a) => {
    const src = URL.createObjectURL(a.target.files[0]);
    console.log("upload:", src);

    this.edit("personal", "photo", src);
  };

  render = () => {
    return (
      <div className="App">
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
