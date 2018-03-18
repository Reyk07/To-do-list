import React from 'react'
import Task from './Task.js'
import { addTask } from "../actions"
import { connect } from "react-redux"
import InputArea from './InputArea'
class TaskList extends React.PureComponent {
    newTask = (name) => {
        if (name) {
            let date = new Date();
            this.props.addTask(this.props.getNewIndex, this.props.groupId, name, date.valueOf());
        }
    }
    render() {
        console.log(this.props.GroupWasFound);
        return <div>
            {this.props.GroupWasFound ?
                <div className={"list-group " + this.props.className} >
                    {
                        this.props.tasks.map(task => (
                            <Task
                                {...task}
                                key={task.id}
                            >
                            </Task>
                        ))
                    }

                    <InputArea className="list-group-item list-group-item-action new-task-input py-1"
                        onChange={this.newTask}
                        value=""
                    >
                        Добавить задачу
                    </InputArea >
                </div >
                :
                <h1 className="text-center">404</h1>}
        </div>
    }
}

export default TaskList;

/*
const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id))
});
export default TaskList;*/