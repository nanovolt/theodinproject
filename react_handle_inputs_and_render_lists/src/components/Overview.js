import React, { Component } from "react";

class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editingTask: null,
    };
  }

  editTask = (t) => {
    console.log("edit:", t);
    this.setState({
      editingTask: t,
    });
  };

  acceptEditTask = (t) => {
    this.props.acceptEditTask(t);
    this.setState({
      editingTask: null,
    });
  };

  render() {
    return (
      <ul>
        {this.props.tasks.map((task) => {
          return (
            <div key={task.id}>
              {this.state.editingTask &&
              this.state.editingTask.id === task.id ? (
                <input
                  defaultValue={task.text}
                  onChange={(e) => this.props.updateTask(e, task)}></input>
              ) : (
                <li>{`#${task.number} ${task.text}`}</li>
              )}

              <button onClick={() => this.props.deleteTask(task)}>
                Delete #{task.number}
              </button>

              {this.state.editingTask &&
              this.state.editingTask.id === task.id ? (
                <button onClick={() => this.acceptEditTask(task)}>
                  Accept edit #{task.number}
                </button>
              ) : (
                <button onClick={() => this.editTask(task)}>
                  Edit #{task.number}
                </button>
              )}
            </div>
          );
        })}

        <div>Amount: {this.props.amount}</div>
      </ul>
    );
  }
}

export default Overview;
