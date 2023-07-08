import { Component } from "react";

export default class CV extends Component {
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
              {/* <span>{item[0]}: </span> */}
              {item[0] === "photo" && (
                <img src={this.props.data.personal.photo} alt="" srcSet="" />
              )}

              {item[0] !== "photo" && item[1]}
              {/* <span>{item[1]}</span> */}
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
                  <div className="schoolStart">
                    {/* <span>Start: </span> */}
                    <span>{item.dateStart}</span>
                  </div>
                  <div className="schoolEnd">
                    {/* <span>End: </span> */}
                    <span>{item.dateEnd}</span>
                  </div>
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
                    <span>{item.tasks}</span>
                  </div>
                  <div className="experiencelStart">
                    {/* <span>Start: </span> */}
                    <span>{item.dateStart}</span>
                  </div>
                  <div className="experiencelEnd">
                    {/* <span>End: </span> */}
                    <span>{item.dateEnd}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
