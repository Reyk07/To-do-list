import React from 'react'
import InputArea from "../components/InputArea.jsx"
import moment from "moment"
class Task extends React.PureComponent {
    state = {
        diff: 0, //разница текущего и требуемого времени
        stage: this.props.stage, //стадия выполнения
        requiredDate: this.props.date //требуемая дата выполнения
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    componentWillMount() {
        this.undateDiff(this.props.date, this.state.stage);
        this.timerID = setInterval(() => this.tick(), 5000);
    }
    componentWillUpdate(nextProps, nextState) {
        //console.log(this.props.index, nextState, " - Обновился ")
    }
    undateDiff = (date, newStage) => {
        var difference = (- moment().diff(date).valueOf());
        if (newStage !== "f" && newStage !== "c") {
            if (difference < 0) newStage = "f";
            else {
                if (difference < 17279999) newStage = "s"
                else newStage = "p";
            }
        }
        this.setState({
            diff: difference,
            stage: newStage
        });
    }
    tick = () => {
        this.undateDiff(this.state.requiredDate, this.state.stage);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ requiredDate: nextProps.date });
        //if (nextProps.stage !== this.props.stage) this.setState({ stage: nextProps.stage });
        this.undateDiff(nextProps.date, nextProps.stage);
    }
    changeDate = () => {
        this.props.redate(this.props.index, moment().add(1, "days"));
        //this.tick();
    }
    completeBtn = () => {
        if (this.state.stage !== 'c') {
            console.log(this.state.stage);
            this.props.completeToggle(this.props.index, "c");
        }
        else this.props.completeToggle(this.props.index, "p");
    }
    progressBar = () => {
        if (this.state.stage === "p" || this.state.stage === "s") {
            var diff = (this.state.diff / 86399999) * 100; //процент оставшегося времени
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
                <button className="btn float-left" onClick={this.completeBtn} >{this.state.stage === "c" ? "☑" : "☐"}</button>
                <div className="col bg-dark">
                    <InputArea
                        className=" "
                        value={this.props.name}
                        change={this.props.rename}
                        index={this.props.index}
                    />
                    {this.progressBar()}
                </div>
                <div className="btn-group-vertical">
                    <button index={this.props.index}
                        type="button"
                        title="Удалить"
                        className="btn btn-outline-danger float-right"
                        onClick={this.props.delete}>❌</button>
                    <button index={this.props.index}
                        type="button"
                        title="Продлить на день"
                        className="btn btn-info float-right"
                        onClick={this.changeDate}>→</button>
                </div>
            </div>


        </div>
    }
}
export default Task;