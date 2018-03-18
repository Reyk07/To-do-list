import React from 'react'
import InputArea from "./InputArea"
import { connect } from 'react-redux'
import { changeGroupName, delTasksOfGroup, delGroup } from '../actions'

const Toolbar = ({ name, changeName, del, className }) => {
    return <div className={"toolbar w-100 " + className}>
        <div className="row">
            <InputArea className="col-10 toolbar-input"
                value={name}
                onChange={changeName}
            />
            <div className="col-2">
                <button
                    type="button"
                    title="Удалить"
                    className=" btn btn-danger"
                    onClick={del}>
                    ❌
                </button>
            </div>
        </div>
    </div>

}
const mapStateToProps = (state, ownProps) => ({
    ...state.groups.find(el => el.id == ownProps.groupId),
    ...ownProps
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    changeName: (name) => {
        dispatch(changeGroupName(ownProps.groupId, name));
    },
    del: () => {
        dispatch(delTasksOfGroup(ownProps.groupId));
        dispatch(delGroup(ownProps.groupId));
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);