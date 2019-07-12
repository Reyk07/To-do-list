import React from 'react';
import './App.css';
import './App.scss';
import "bootstrap/dist/css/bootstrap.css"
import Menu from "./components/Menu.jsx"
import TaskList from "./components/TaskList.jsx"
import Toolbar from "./components/Toolbar.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    var temp = JSON.parse(window.localStorage.getItem("pList"));
    if (!temp) { //при первом запуске
      temp = [{ index: "p0", name: "Мой день" }];
      window.localStorage.setItem("pList", JSON.stringify(temp));
      window.localStorage.setItem("p0", '[{"stage":"p","index":"t0","name":"Failed example","date":1521147599999},{"stage":"c","index":"t1","name":"Complete example","date":1521233999999},{"stage":"p","index":"t2","name":"Process example","date":1521233999999}]')
    };
    this.state = {
      pList: temp,
      activeProject: temp[0].index
    }
  }
  changeActiveProject = (index) => {
    this.setState({ activeProject: index });
  }
  componentWillUpdate(nextProps, nextState) {
    window.localStorage.setItem("pList", JSON.stringify(nextState.pList));
  }
  newProject = () => {
    //нахождение свободного индекса
    var list = [];
    var newIndex = 0;
    this.state.pList.forEach(element => {
      list.push(+element.index.slice(1));
    });
    while (list.indexOf(newIndex) > -1) newIndex += 1;
    newIndex = "p" + newIndex;
    console.log(newIndex, list);

    var temp = {
      index: newIndex,
      name: "No Name " + newIndex
    };
    this.setState({
      pList: this.state.pList.concat([temp]),
      activeProject: temp.index
    });

    // this.changeActiveProject(newIndex);
  }
  delProject = () => {
    if (this.state.pList.length > 1) {
      window.localStorage.removeItem(this.state.activeProject);
      var newList = this.state.pList.filter(element => {
        return element.index !== this.state.activeProject;
      });
      this.setState({
        pList: newList,
        activeProject: newList[newList.length - 1].index
      });
    }
  }
  changeProjectName = (event) => {
    var temp = this.state.pList.find(element => {
      return element.index === this.state.activeProject;
    });
    temp.name = event.target.getAttribute("value");
    this.forceUpdate();
  }
  render() {
    return (
      <div className="container-flex h-100 bg-light">
        <div className=" row mx-0  h-100 flex-nowrap ">
          <div className="sidebar h-100">
            <Menu className="menu"
              activeProject={this.state.activeProject}
              changeActiveProject={this.changeActiveProject}
              newProject={this.newProject}
              projectList={this.state.pList} />
          </div>

          <div className="col px-0 main">
            <Toolbar
              name={this.state.pList.find(element => {
                return element.index === this.state.activeProject;
              }).name}
              activeProject={this.state.activeProject}
              changeName={this.changeProjectName}
              delProject={this.delProject} />

            <TaskList className="tasklist"
              activeProject={this.state.activeProject} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

