import React from 'react'
//import { addTask } from "../actions"
import { connect } from 'react-redux'
import InputArea from './InputArea'
import { changeTaskName, changeTaskDate, toggleTaskComplete, delTask } from "../actions"
import moment from "moment";
class Task extends React.PureComponent {
    TIME_PERIOD = 24*60*60*1000;// день
    state = {
        diff: 0, //разница текущего и требуемого времени
        stage: this.props.completed ? "c": "p" //стадия выполнения
    }
    
    componentWillMount() {
        this.undateStage(this.props.date, this.state.stage);
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    undateStage = (date, newStage) => {
        let now = new Date();
        var difference = this.TIME_PERIOD - now + (this.props.date);
        if (newStage !== "c") {
            if (difference < 0) newStage = "f";
            else {
                if (difference < this.TIME_PERIOD/4) newStage = "s"
                else newStage = "p";
            }
        }
        this.setState({
            stage: newStage,
            diff: difference
        });
    }
    tick = () => {
        this.undateStage(this.props.date, this.state.stage);
    }
    componentWillReceiveProps(nextProps) {
        this.undateStage(nextProps.date, nextProps.completed ? "c": "p");
    }
    changeDateToNow = () => {
        let d = new Date();
        this.props.changeDate(d.valueOf());
    }

    progressBar = () => {
        if (this.state.stage === "p" || this.state.stage === "s") {
            var diff = (this.state.diff / this.TIME_PERIOD) * 100; //процент оставшегося времени
            var d = moment.duration(this.state.diff);
            var titleStr = Math.floor(d.asHours()) + moment.utc(this.state.diff).format(":mm:ss"); //оставшееся время
        }
        else {
            var titleStr = ((this.state.stage === "c") ? "Complete!" : "") + ((this.state.stage === "f") ? "Failed!" : "")
        }
        return <div className={"progress " + ((this.state.stage === "c") ? "bg-success" : "") + ((this.state.stage === "f") ? "bg-danger" : "")}
            title={titleStr}
        >
            {
                (this.state.stage === "p" || this.state.stage === "s") ?
                    <div className={"progress-bar progress-bar-striped progress-bar-animated " + ((this.state.stage === "s") ? "bg-warning" : "")}
                        role="progressbar"
                        aria-valuenow={diff}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{ width: diff + "%" }}
                    >
                    </div>
                    :
                    ""
            }
        </div>
    }
    render() {
        return <div className="list-group-item list-group-item-action">
            <div className="w-100 row">
                <button className="btn float-left" onClick={this.props.toggleComplete} >{this.props.completed ? "☑" : "☐"}</button>
                <div className="col bg-dark">
                    <InputArea
                        className=" "
                        value={this.props.name}
                        onChange={this.props.changeName}
                    />
                <this.progressBar />
                </div>

                <div className="btn-group-vertical">
                    <button
                        type="button"
                        title="Удалить"
                        className="btn btn-outline-danger float-right"
                        onClick={this.props.delete}>❌</button>
                    <button
                        type="button"
                        title="Продлить на день"
                        className="btn btn-info float-right"
                        onClick={this.changeDateToNow}>→</button>
                </div>
            </div>


        </div>
    }
}

const mapStateToProps = (state, ownProps) => ({
    //...state.tasks.filter(el => el.id==ownProps.id)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeName: (name) => dispatch(changeTaskName(ownProps.id, name)),
    changeDate: (date) => dispatch(changeTaskDate(ownProps.id, date)),
    delete: () => dispatch(delTask(ownProps.id)),
    toggleComplete: () => dispatch(toggleTaskComplete(ownProps.id))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Task);