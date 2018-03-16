import React from 'react'
import Task from "../components/Task.jsx"
import moment from "moment"
class TaskList extends React.PureComponent {
  state = {
    activeProject: 0,
    taskList: []
  }
  delTask = event => {
    this.setState({
      taskList: this.state.taskList.filter(element => {
        return element.index !== event.target.getAttribute("index");
      })
    })
  }
  renameTask = event => {
    this.state.taskList.find(element => {
      return element.index === event.target.getAttribute("index");
    }).name = event.target.getAttribute("value");
    this.forceUpdate();
  }
  redateTask = (index, date) => {
    this.state.taskList.find(element => {
      return element.index === index;
    }).date = date.toDate().valueOf();
    this.forceUpdate();
  }
  completeToggle = (index, stage) => {
    var temp = this.state.taskList.find(element => { return element.index === index; });
    //console.log(temp);
    temp.stage = stage;
    //console.log(this.state.taskList);
    this.forceUpdate();
  }


  newTask = (event) => {
    //нахождение свободного индекса
    var list = [];
    var newIndex = 0;
    this.state.taskList.forEach(element => {
      list.push(+element.index.slice(1));
    });
    while (list.indexOf(newIndex) > -1) newIndex += 1;
    newIndex = "t" + newIndex;

    this.setState({
      taskList: this.state.taskList.concat([{
        stage: "p",
        index: newIndex,
        name: "No Name",
        date: moment().endOf("days").valueOf()
      }])
    });

  }

  updateTaskList = (activeProject) => {
    console.log("Таск лист обновился");
    var temp = window.localStorage.getItem(activeProject);
    if (!temp) {
      window.localStorage.setItem(activeProject, "")
      this.setState({ taskList: [] });
    }
    else {
      this.setState({ taskList: JSON.parse(temp) });
    }
  }
  componentWillMount() {
    this.updateTaskList(this.props.activeProject);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.activeProject !== nextProps.activeProject) this.updateTaskList(nextProps.activeProject);
  }
  saveList = (list) => {
    window.localStorage.setItem(this.props.activeProject, JSON.stringify(list));
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.props.activeProject === nextProps.activeProject) {
      this.saveList(nextState.taskList);
    }
  }

  render() {
    return <div className={this.props.className}>
      <div className="list-group">
        {
          this.state.taskList.map(element => {
            return <Task key={element.index}
              index={element.index}
              name={element.name}
              stage={element.stage}
              delete={this.delTask}
              rename={this.renameTask}
              completeToggle={this.completeToggle
              }
              date={element.date}
              redate={this.redateTask}
            />;
          })
        }
      </div>
      <div className="w-100" title="Добавить новую задачу">
        <button type="button" className="btn w-100" onClick={this.newTask}>Добавить новую задачу</button>
      </div>
    </div>
  }
}

export default TaskList;