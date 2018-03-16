import React from 'react'
class Menu extends React.Component {
    handleClick = (event) => {
        this.props.changeActiveProject(event.target.getAttribute("index"));
    }
    render() {
        return <div className={this.props.className}>
            <div className="list-group list-group-flush ">
                {
                    this.props.projectList.map(element => {
                        return <button
                            className={"list-group-item list-group-item-action " + (this.props.activeProject === element.index ? "active" : "")}
                            type="button"
                            key={element.index}
                            index={element.index}
                            onClick={this.handleClick}//{this.props.changeActiveProject}
                        >
                            {element.name}
                        </button>
                    }
                    )
                }
                <button className="list-group-item list-group-item-action "
                    type="button"
                    key="addProject"
                    onClick={this.props.newProject}//{this.props.changeActiveProject}
                >Добавить проект
                        </button>
            </div>
        </div>
    }
}
export default Menu;