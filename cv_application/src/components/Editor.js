import { Component } from "react";

export default class Editor extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  inputDescriptionEventListeners = (e) => {
    const offset = e.target.offsetHeight - e.target.clientHeight;

    e.target.addEventListener("input", () => {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight + offset}px`;
    });
  };

  render() {
    return (
      <div className="Editor">
        <h1>Editor</h1>
        <form>
          <fieldset>
            <legend>Personal</legend>

            {this.props.data.personal && (
              <div className="fields">
                <div className="field">
                  <label htmlFor="name">First name</label>
                  <input
                    type="text"
                    id="name"
                    onChange={(e) =>
                      this.props.edit("personal", "name", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="surname">Last name</label>
                  <input
                    type="text"
                    id="surname"
                    onChange={(e) =>
                      this.props.edit("personal", "surname", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="imageDisable">Image</label>

                  {this.props.data.personal.photo === "" && (
                    <label className="imageButton">
                      Upload
                      <input
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg, image/jpg"
                        style={{ display: "none" }}
                        onChange={(e) => this.props.upload(e)}
                      />
                    </label>
                  )}

                  {this.props.data.personal.photo !== "" && (
                    <button
                      onClick={() => this.props.edit("personal", "photo", "")}>
                      Remove
                    </button>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    onChange={(e) =>
                      this.props.edit("personal", "title", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    onChange={(e) =>
                      this.props.edit("personal", "description", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="text"
                    id="email"
                    onChange={(e) =>
                      this.props.edit("personal", "email", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    onChange={(e) =>
                      this.props.edit("personal", "phone", e.target.value)
                    }
                  />
                </div>

                <button type="button" onClick={() => this.props.delete()}>
                  Delete
                </button>
              </div>
            )}

            {!this.props.data.personal && (
              <button type="button" onClick={() => this.props.add()}>
                Add
              </button>
            )}
          </fieldset>

          <fieldset>
            <legend>Links</legend>
            <div className="fields">
              {this.props.data.links.map((field, i) => (
                <div className="field" key={field.id}>
                  <label htmlFor="linkName">Link name</label>
                  <input
                    type="text"
                    id="linkName"
                    onChange={(e) =>
                      this.props.editArray(
                        "links",
                        "linkName",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="link">Link</label>
                  <input
                    type="text"
                    id="link"
                    onChange={(e) =>
                      this.props.editArray("links", "link", e.target.value, i)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => this.props.deleteArray("links", i)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button type="button" onClick={() => this.props.addArray("links")}>
              Add
            </button>
          </fieldset>

          <fieldset>
            <legend>Skills</legend>
            <div className="fields">
              {this.props.data.skills.map((field, i) => (
                <div className="field" key={field.id}>
                  <label htmlFor="skill">Skill</label>
                  <input
                    type="text"
                    id="skill"
                    onChange={(e) =>
                      this.props.editArray("skills", "skill", e.target.value, i)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => this.props.deleteArray("skills", i)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button type="button" onClick={() => this.props.addArray("skills")}>
              Add
            </button>
          </fieldset>

          <fieldset>
            <legend>Personal projects</legend>
            <div className="fields">
              {this.props.data.personalProjects.map((field, i) => (
                <div className="field" key={field.id}>
                  <label htmlFor="projectName">Project</label>
                  <input
                    type="text"
                    id="projectName"
                    onChange={(e) =>
                      this.props.editArray(
                        "personalProjects",
                        "projectName",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="description">Description</label>

                  <textarea
                    id="description"
                    onChange={(e) =>
                      this.props.editArray(
                        "personalProjects",
                        "description",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="features">
                    Features (add ";" to separate and make a list)
                  </label>
                  <textarea
                    id="features"
                    onChange={(e) =>
                      this.props.editArray(
                        "personalProjects",
                        "features",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="link">Link</label>
                  <input
                    type="text"
                    id="link"
                    onChange={(e) =>
                      this.props.editArray(
                        "personalProjects",
                        "link",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      this.props.deleteArray("personalProjects", i)
                    }>
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => this.props.addArray("personalProjects")}>
              Add
            </button>
          </fieldset>

          <fieldset>
            <legend>Education</legend>
            <div className="fields">
              {this.props.data.education.map((field, i) => (
                <div className="field" key={field.id}>
                  <label htmlFor="school">School</label>
                  <input
                    type="text"
                    id="school"
                    onChange={(e) =>
                      this.props.editArray(
                        "education",
                        "school",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    onChange={(e) =>
                      this.props.editArray(
                        "education",
                        "location",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="degree">Degree</label>
                  <input
                    type="text"
                    id="degree"
                    onChange={(e) =>
                      this.props.editArray(
                        "education",
                        "degree",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="dateStart">Start</label>
                  <input
                    type="date"
                    id="dateStart"
                    onChange={(e) =>
                      this.props.editArray(
                        "education",
                        "dateStart",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="dateEnd">End</label>
                  <input
                    type="date"
                    id="dateEnd"
                    onChange={(e) =>
                      this.props.editArray(
                        "education",
                        "dateEnd",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={() => this.props.deleteArray("education", i)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => this.props.addArray("education")}>
              Add
            </button>
          </fieldset>

          <fieldset>
            <legend>Experience</legend>
            <div className="fields">
              {this.props.data.experience.map((field, i) => (
                <div className="field" key={field.id}>
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    onChange={(e) =>
                      this.props.editArray(
                        "experience",
                        "company",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    onChange={(e) =>
                      this.props.editArray(
                        "experience",
                        "location",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    onChange={(e) =>
                      this.props.editArray(
                        "experience",
                        "title",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="tasks">
                    Tasks (add ";" to separate and make a list)
                  </label>
                  <textarea
                    type="text"
                    id="tasks"
                    onChange={(e) =>
                      this.props.editArray(
                        "experience",
                        "tasks",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="dateStart">Start</label>
                  <input
                    type="date"
                    id="dateStart"
                    onChange={(e) =>
                      this.props.editArray(
                        "experience",
                        "dateStart",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <label htmlFor="dateEnd">End</label>
                  <input
                    type="date"
                    id="dateEnd"
                    onChange={(e) =>
                      this.props.editArray(
                        "experience",
                        "dateEnd",
                        e.target.value,
                        i
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={() => this.props.deleteArray("experience", i)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => this.props.addArray("experience")}>
              Add
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
