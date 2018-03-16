import React from 'react'
import InputArea from '../components/InputArea.jsx'
class Toolbar extends React.PureComponent {
    render() {
        return <div className="toolbar " >
            <div className="row">
                <InputArea className="col-10 toolbar-input"
                    value={this.props.name}
                    change={this.props.changeName}
                    index={this.props.activeProject}
                />
                <div className="col-2">
                    <button
                        index={this.props.activeProject}
                        type="button"
                        title="Удалить"
                        className=" btn btn-danger"
                        onClick={this.props.delProject}>
                        ❌
                </button>
                </div>
            </div>
        </div>
    }
}
export default Toolbar;