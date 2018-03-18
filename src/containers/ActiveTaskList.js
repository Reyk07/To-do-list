import { connect } from 'react-redux'
import { addTask } from "../actions"
import TaskList from '../components/TaskList';
import { getNewIndex } from '../functions';

const ActiveTaskList = (tasks, { groupId }) => {
  return tasks.filter(el => (el.groupId === groupId));
}

const GroupWasFound = (groups, { groupId }) => {
  return groups.find(el => (el.id == groupId));
}
const mapStateToProps = (state, ownProps) => ({
  GroupWasFound: ((typeof GroupWasFound(state.groups, ownProps)) != "undefined"),
  tasks: ActiveTaskList(state.tasks, ownProps),
  getNewIndex: getNewIndex(state.tasks),
  ...ownProps
})

const mapDispatchToProps = dispatch => ({
  addTask: (id, groupId, name, date) => dispatch(addTask(id, groupId, name, date)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)