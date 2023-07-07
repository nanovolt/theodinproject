import { Component } from "react";
import FormFieldset from "./FormFieldset";

export default class Editor extends Component {
  constructor(props) {
    super(props);
  }

  add = () => {
    this.props.add();
  };

  addArray = (category) => {
    this.props.addArray(category);
  };

  delete = () => {
    this.props.delete();
  };

  deleteArray = (index, category) => {
    this.props.deleteArray(index, category);
  };

  edit = (category, field, value, inputIndex, arrI) => {
    this.props.edit(category, field, value, inputIndex, arrI);
  };

  editArray = (category, field, value, inputIndex, arrI) => {
    this.props.editArray(category, field, value, inputIndex, arrI);
  };

  render() {
    return (
      <div className="Editor">
        <form>
          <h1>Editor</h1>
          <FormFieldset
            legend="Personal"
            category="personal"
            inputs={[
              { id: "name", label: "Name", type: "text" },
              { id: "surname", label: "Surname", type: "text" },
              { id: "title", label: "Title", type: "text" },
              { id: "description", label: "Description", type: "textarea" },
              { id: "email", label: "E-mail", type: "text" },
              { id: "phone", label: "Phone", type: "text" },
            ]}
            edit={this.props.edit}
            isArray={false}
            data={this.props.data.personal}
            add={this.props.add}
            delete={this.props.delete}></FormFieldset>

          <FormFieldset
            legend="Education"
            category="education"
            inputs={[
              { id: "school", label: "School", type: "text" },
              { id: "location", label: "Location", type: "text" },
              { id: "degree", label: "Degree", type: "text" },
              { id: "dateStart", label: "Start", type: "date" },
              { id: "dateEnd", label: "End", type: "date" },
            ]}
            editArray={this.props.editArray}
            isArray={true}
            data={this.props.data.education}
            addArray={this.props.addArray}
            deleteArray={this.props.deleteArray}></FormFieldset>

          <FormFieldset
            legend="Experience"
            category="experience"
            inputs={[
              { id: "company", label: "Company", type: "text" },
              { id: "location", label: "Location", type: "text" },
              { id: "position", label: "Position", type: "text" },
              { id: "tasks", label: "Tasks", type: "text" },
              { id: "dateStart", label: "Start", type: "date" },
              { id: "dateEnd", label: "End", type: "date" },
            ]}
            editArray={this.props.editArray}
            isArray={true}
            data={this.props.data.experience}
            addArray={this.props.addArray}
            deleteArray={this.props.deleteArray}></FormFieldset>
        </form>
      </div>
    );
  }
}
