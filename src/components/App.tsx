import * as React from "react";

interface StateInterface {
  currentTask: string;
  tasks: Array<TaskInterface>;
}
interface TaskInterface {
  id: number;
  value: string;
  completed: boolean;
}

class App extends React.Component<{}, StateInterface> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentTask: "",
      tasks: []
    };
  }
  
  public toggleDone(index:number): void {
    const state: Array<TaskInterface> = [...this.state.tasks]
    const taskSelected: TaskInterface = state.splice(index, 1)[0]
    taskSelected.completed = !taskSelected.completed
    state.splice(index, 0, taskSelected)
    this.setState({ tasks: state})
   
  }

  public deleteTask(id: number): void {
    const tasks: Array<TaskInterface> = this.state.tasks.filter(
      (task: TaskInterface, index: number) => {
        return task.id !== id;
      }
    );
    this.setState({
      tasks
    });
  }

  public handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      currentTask: e.target.value
    });
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.setState({
      currentTask: "",
      tasks: [
        ...this.state.tasks,
        {
          id: this._timeInMilliseconds(),
          value: this.state.currentTask,
          completed: false
        }
      ]
    });
  }

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: TaskInterface, index: number) => {
      return (
        <div key={task.id}>
          <span>{task.value}</span>
          <button onClick={() => this.deleteTask(task.id)}>Delete</button>
          <button onClick={() => this.toggleDone(index)}>Done</button>
        </div>
      );
    });
  }

  private _timeInMilliseconds(): number {
    const date: Date = new Date();
    return date.getTime();
  }

  public render(): JSX.Element {
    console.log(this.state);
    
    return (
      <div>
        <h1>React with Typescript</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            value={this.state.currentTask}
            type="text"
            placeholder="Add a task"
            onChange={e => this.handleChange(e)}
          />
          <button type="submit">Add Task</button>
        </form>
        <section>{this.renderTasks()}</section>
      </div>
    );
  }
}

export default App;
