import { Component } from "react";
import "../styles/cv.css";
import format from "date-fns/format";
import { parseISO } from "date-fns/esm";

export default class CV extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  renderArr(arr, name) {
    console.log("render:", arr);

    return (
      <div className={name}>
        <h2>Education</h2>
        {arr.map((item) => {
          return <div key="a">{item}</div>;
        })}
      </div>
    );
  }

  renderObject() {
    return (
      <div className="personal">
        <h2>Personal info</h2>
        <div className="infoContainer">
          {Object.entries(this.props.data.personal).map((item) => (
            <div className={item[0]} key={item}>
              {this.props.data.personal.photo && item[0] === "photo" && (
                <img src={this.props.data.personal.photo} alt="" srcSet="" />
              )}

              {item[0] !== "photo" && item[1]}
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    // console.log("cv props:", this.props);

    return (
      <div className="CV">
        {/* <h1>CV</h1> */}

        {this.props.data.personal && this.renderObject()}

        {this.props.data.links.length > 0 && (
          <div className="links">
            <h2>Links</h2>

            {this.props.data.links.map((item) => {
              return (
                <div className="linksItem" key={item.id}>
                  <a href={item.link} target="blank">
                    {item.linkName}
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {this.props.data.skills.length > 0 && (
          <div className="skills">
            <h2>Skills</h2>

            {this.props.data.skills.map((item) => {
              return (
                <div className="skillsItem" key={item.id}>
                  {item.skill}
                </div>
              );
            })}
          </div>
        )}

        {this.props.data.personalProjects.length > 0 && (
          <div className="personalProjects">
            <h2>Personal projects</h2>

            {this.props.data.personalProjects.map((item) => {
              return (
                <div className="projectItem" key={item.id}>
                  <div className="projectName">
                    {/* <span>School: </span> */}
                    <span>{item.projectName}</span>
                  </div>

                  <div className="description">
                    {/* <span>Location: </span> */}
                    <span>{item.description}</span>
                  </div>
                  <div className="features">
                    {/* <span>Degree: </span> */}
                    {item.features && (
                      <ul className="featureList">
                        {item.features.split(";").map((item) => {
                          return <li key={item}>{item}</li>;
                        })}
                      </ul>
                    )}
                  </div>

                  {item.link && (
                    <div className="links">
                      {/* <span>Start: </span> */}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer">
                        Link
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {this.props.data.education.length > 0 && (
          <div className="education">
            <h2>Education</h2>

            {this.props.data.education.map((item) => {
              return (
                <div className="educationItem" key={item.id}>
                  <div className="school">
                    {/* <span>School: </span> */}
                    <span>{item.school}</span>
                  </div>

                  <div className="schoolLocation">
                    {/* <span>Location: </span> */}
                    <span>{item.location}</span>
                  </div>
                  <div className="degree">
                    {/* <span>Degree: </span> */}
                    <span>{item.degree}</span>
                  </div>

                  {item.dateStart && (
                    <div className="date">
                      <span>
                        {item.dateStart &&
                          format(parseISO(item.dateStart), "yyyy")}
                      </span>
                      <span> - </span>
                      <span>
                        {!item.dateEnd && "Present"}
                        {item.dateEnd && format(parseISO(item.dateEnd), "yyyy")}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {this.props.data.experience.length > 0 && (
          <div className="experience">
            <h2>Experience</h2>
            {this.props.data.experience.map((item) => {
              return (
                <div className="experienceItem" key={item.id}>
                  <div className="company">
                    {/* <span>Company: </span> */}
                    <span>{item.company}</span>
                  </div>

                  <div className="companylLocation">
                    {/* <span>Location: </span> */}
                    <span>{item.location}</span>
                  </div>
                  <div className="position">
                    {/* <span>Postion: </span> */}
                    <span>{item.position}</span>
                  </div>
                  <div className="tasks">
                    {/* <span>Tasks: </span> */}
                    {/* <span>{item.tasks}</span> */}
                    {item.tasks && (
                      <ul className="taskList">
                        {item.tasks.split(";").map((item) => {
                          return <li key={item}>{item}</li>;
                        })}
                      </ul>
                    )}
                  </div>

                  {item.dateStart && (
                    <div className="date">
                      <span>
                        {item.dateStart &&
                          format(parseISO(item.dateStart), "yyyy")}
                      </span>
                      <span> - </span>
                      <span>
                        {!item.dateEnd && "Present"}
                        {item.dateEnd && format(parseISO(item.dateEnd), "yyyy")}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
