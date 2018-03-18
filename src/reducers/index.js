import { combineReducers } from 'redux';
import tasks from './tasks';
import groups from './groups';
export default combineReducers({
    groups,
    tasks
})