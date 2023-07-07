import { Component } from "react";
import "../styles/fieldset.css";

export default class FormFieldset extends Component {
  constructor(props) {
    super(props);

    if (this.props.isArray) {
      this.state = {
        added: [],
        size: 0,
      };
    } else {
      this.state = {
        added: [this.props.inputs.map((input) => ({ [input.id]: "" }))],
        // added: [this.props.data],

        size: 1,
      };
    }
  }

  addFields = (category) => {
    if (this.props.isArray) {
      this.props.addArray(category);
    } else {
      this.props.add();
    }

    console.log("add field");
    // this.setState(
    //   (prev) => ({
    //     added: prev.added.concat(this.props.data),
    //   }),
    //   () => {
    //     this.setState((prev) => ({
    //       size: prev.added.length,
    //     }));
    //   }
    // );
  };

  deleteFields = (index, category) => {
    // console.log("deleting:", index);
    // this.setState(
    //   (prev) => ({
    //     added: prev.added.filter((field, i) => i !== index),
    //   }),
    //   () => {
    //     this.setState((prev) => ({
    //       size: prev.added.length,
    //     }));
    //   }
    // );

    if (this.props.isArray) {
      this.props.deleteArray(index, category);
    } else {
      this.props.delete();
    }
  };

  edit = (category, field, value, inputIndex, arrI) => {
    // console.log("arrI:", arrI);
    // console.log("index:", index);

    if (this.props.isArray) {
      this.props.editArray(category, field, value, inputIndex, arrI);
    } else {
      this.props.edit(category, field, value, inputIndex, arrI);
    }
  };

  renderInputs = (arrI) => {
    return this.props.inputs.map((input, inputIndex) => {
      return (
        <div className="field" key={input.id}>
          <label htmlFor={input.id}>{input.label}</label>
          {input.type !== "textarea" && (
            <input
              type={input.type}
              id={input.id}
              name={input.id}
              onChange={(e) =>
                this.edit(
                  this.props.category,
                  input.id,
                  e.target.value,
                  inputIndex,
                  arrI
                )
              }
            />
          )}
          {input.type === "textarea" && (
            <textarea
              id={input.id}
              name={input.id}
              onChange={(e) =>
                this.props.edit(
                  this.props.category,
                  input.id,
                  e.target.value,
                  inputIndex,
                  arrI
                )
              }
            />
          )}
        </div>
      );
    });
  };

  renderAdd() {
    return (
      <button type="button" onClick={() => this.addFields(this.props.category)}>
        Add
      </button>
    );
  }

  renderDelete(i) {
    return (
      <button
        type="button"
        onClick={() => this.deleteFields(i, this.props.category)}>
        Delete
      </button>
    );
  }

  render() {
    console.log("props:", this.props);
    // console.log("isArray:", Array.isArray(this.props.data));

    return (
      <fieldset>
        <legend>{this.props.legend}</legend>

        {this.props.data && !this.props.isArray && this.renderInputs()}
        {!this.props.data && !this.props.isArray && this.renderAdd()}
        {this.props.data && this.state.size > 0 && this.renderDelete()}

        {this.props.isArray &&
          this.props.data.map((item, i) => {
            return (
              <div className="fields" key={item.id}>
                {this.renderInputs(i)}
                {this.renderDelete(i)}
              </div>
            );
          })}

        {this.props.isArray && this.renderAdd()}
      </fieldset>
    );
  }
}
