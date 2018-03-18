import React, { Component } from 'react';
import Redux from 'redux';
import Menu from './Menu';
import { NavLink } from 'react-router-dom';
import ActiveTaskList from "../containers/ActiveTaskList";
import Toolbar from "../components/Toolbar";
import "../css/App.css";
class App extends Component {

  render() {
    console.log(this.props.match.params);

    return (
      <div className="container-flex h-100 bg-light">
        <div className="row mx-0  h-100 flex-nowrap ">
          <Menu groupId={this.props.match.params.groupId} className="sidebar h-100" />
          <div className="col px-0 main">
            <Toolbar groupId={this.props.match.params.groupId} />
            <ActiveTaskList groupId={this.props.match.params.groupId} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

