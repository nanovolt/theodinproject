import { Component } from "react";
import "../styles/cv.css";
import format from "date-fns/format";
import { parseISO } from "date-fns/esm";

export default class CV extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="CV">
        {/* <h1>CV</h1> */}

        <div className="left">
          {this.props.data.personal && (
            <div className="personal">
              <div className="namesurname">
                <span className="name">{this.props.data.personal.name} </span>
                <span className="surname">
                  {this.props.data.personal.surname}
                </span>
              </div>

              <div className="title">{this.props.data.personal.title}</div>

              {this.props.data.personal.photo && (
                <div className="photo">
                  <img src={this.props.data.personal.photo} alt="" srcSet="" />
                </div>
              )}

              <div className="description">
                {this.props.data.personal.description}
              </div>

              {this.props.data.personal.email && (
                <div>
                  E-mail
                  <div className="email">{this.props.data.personal.email}</div>
                </div>
              )}
              {this.props.data.personal.phone && (
                <div>
                  Phone
                  <div className="phone">{this.props.data.personal.phone}</div>
                </div>
              )}
            </div>
          )}

          {this.props.data.links.length > 0 && (
            <div className="links">
              {/* <h2>Links</h2> */}

              {this.props.data.links.map((item) => {
                return (
                  <div className="linksItem" key={item.id}>
                    <div>{item.linkName}</div>
                    <a href={item.link} target="blank">
                      {item.link}
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
        </div>
        <div className="right">
          {this.props.data.personalProjects.length > 0 && (
            <div className="personalProjects">
              <h2>Personal projects</h2>

              {this.props.data.personalProjects.map((item) => {
                return (
                  <div className="projectItem" key={item.id}>
                    <div className="projectName">{item.projectName}</div>
                    <div className="description">{item.description}</div>
                    <div className="features">
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
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer">
                          {item.link}
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
                      <span>{item.school}</span>
                    </div>

                    <div className="schoolLocation">
                      <span>{item.location}</span>
                    </div>
                    <div className="degree">
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
                          {item.dateEnd &&
                            format(parseISO(item.dateEnd), "yyyy")}
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
                      <span>{item.company}</span>
                    </div>

                    <div className="companylLocation">
                      <span>{item.location}</span>
                    </div>
                    <div className="position">
                      <span>{item.position}</span>
                    </div>
                    <div className="tasks">
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
                          {item.dateEnd &&
                            format(parseISO(item.dateEnd), "yyyy")}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}
