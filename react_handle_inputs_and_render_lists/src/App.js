import React, { Component } from "react";
import Overview from "./components/Overview";
import uniqid from "uniqid";

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: {
        text: "",
        id: uniqid(),
      },
      tasks: [],
      updatingTask: {
        text: "",
        id: "",
      },
      amount: 0,
    };
  }

  handleChange = (e) => {
    this.setState(
      {
        task: {
          text: e.target.value,
          id: this.state.task.id,
          number: this.state.tasks.length + 1,
        },
      },
      () => {}
    );
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    this.setState(
      {
        tasks: this.state.tasks.concat(this.state.task),
        task: {
          text: "",
          id: uniqid(),
        },
        // amount: this.state.tasks.length,
      },
      () => {
        this.setState({
          amount: this.state.tasks.length,
        });
      }
    );
  };

  deleteTask = (task) => {
    this.setState(
      {
        tasks: this.state.tasks.filter((t) => t.id !== task.id),
      },
      () => {
        this.setState({
          amount: this.state.tasks.length,
        });
      }
    );
  };

  acceptEditTask = (task) => {
    this.setState({
      tasks: this.state.tasks.map((t) => {
        if (t.id === task.id) {
          t.text = this.state.updatingTask.text;
        }

        return t;
      }),
    });
  };

  updateTask = (e, task) => {
    console.log("updating task:", task);

    this.setState({
      updatingTask: {
        text: e.target.value,
        id: task.id,
      },
    });
  };

  render() {
    const { task, tasks, amount } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitTask}>
          <label htmlFor="taskInput">Enter task</label>
          <input
            onChange={this.handleChange}
            value={task.text}
            type="text"
            id="taskInput"
          />
          <button type="submit">Add Task</button>
        </form>

        <Overview
          tasks={tasks}
          amount={amount}
          deleteTask={this.deleteTask}
          updateTask={this.updateTask}
          acceptEditTask={this.acceptEditTask}
        />
      </div>
    );
  }
}

export default App;
