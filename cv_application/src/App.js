import "./App.css";
import { Component } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import ReactToPrint from "react-to-print";
import CV from "./components/CV";
import Footer from "./components/Footer";
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

    if (field === "photo" && value === "") {
      console.log("revoke:", this.srcRevoke);
      URL.revokeObjectURL(this.srcRevoke);
    }
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
    this.srcRevoke = URL.createObjectURL(a.target.files[0]);
    this.edit("personal", "photo", this.srcRevoke);
  };

  render = () => {
    return (
      <div className="App">
        <Header></Header>

        <main>
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

          <div className="cvContainer">
            <div className="pdf">
              <ReactToPrint
                trigger={() => {
                  return <button>Generate PDF / Print</button>;
                }}
                content={() => this.componentRef}
                documentTitle={document.title}
              />
            </div>

            <CV
              ref={(el) => (this.componentRef = el)}
              data={this.state}
              setEmpty={this.setEmpty}></CV>
          </div>
        </main>
        <Footer></Footer>
      </div>
    );
  };
}

export default App;
