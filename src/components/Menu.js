import React from 'react'
import GroupLink from './GroupLink';
import { addGroup } from "../actions"
import { connect } from "react-redux";
import { getNewIndex } from '../functions';
const Menu = ({ groups, className, groupId, addGroup }) => {
    return (
        <div className={"list-group " + className}>
            {groups.map(group => (
                <GroupLink className="list-group-item list-group-item-action"
                    groupId={group.id}
                    key={group.id}
                >
                    {group.name}
                </GroupLink>
            ))}

            <button className="list-group-item list-group-item-action "
                type="button"
                key="addGroupBtn"
                onClick={(event) => { addGroup(getNewIndex(groups), "no name"); }}
            >
                Добавить проект
            </button>
        </div>
    );



}
const mapStateToProps = (state, ownProps) => ({
    groups: state.groups,
    ...ownProps
})

const mapDispatchToProps = dispatch => ({
    addGroup: (id, name) => dispatch(addGroup(id, name))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu);
/*return <div className={className}>
            <div className="list-group list-group-flush ">
                {
                    projectList.map(element => {
                        return <button
                            className={"list-group-item list-group-item-action " + (activeProject === element.index ? "active" : "")}
                            type="button"
                            key={element.index}
                            index={element.index}
                            onClick={this.handleClick}//{changeActiveProject}
                        >
                            {element.name}
                        </button>
                    }
                    )
                }
                <button className="list-group-item list-group-item-action "
                    type="button"
                    key="addProject"
                    onClick={newProject}//{changeActiveProject}
                >Добавить проект
                        </button>
            </div>
        </div>*/