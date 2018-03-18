/*
 * action types
 */
//groups
export const ADD_GROUP = 'ADD_GROUP'
export const CHECK_GROUP = 'CHECK_GROUP'
export const CHANGE_GROUP_NAME = 'CHANGE_GROUP_NAME'
export const DEL_GROUP = 'DEL_GROUP'
//tasks
export const DEL_TASKS_OF_GROUP = 'DEL_TASKS_OF_GROUP'
export const ADD_TASK = 'ADD_TASK'
export const DEL_TASKS = 'DEL_TASKS';
export const CHANGE_TASK_NAME = 'CHANGE_TASK_NAME';
export const CHANGE_TASK_DATE = 'CHANGE_TASK_DATE';
export const TOGGLE_TASK_COMPLETE = 'TOGGLE_TASK_COMPLETE'
/*
 * action creators
 */

export function addGroup(id, name) {
    return { type: ADD_GROUP, id, name }
}
export function checkGroup( groupId) {
    return { type: CHECK_GROUP, groupId }
}

export function addTask(id,groupId, name, date) {
    return { type: ADD_TASK, id, groupId, name , date}
}
export function changeGroupName(id, name){
    return { type: CHANGE_GROUP_NAME, id, name }
}

export function delTasksOfGroup(groupId){
    return { type: DEL_TASKS_OF_GROUP, groupId}
}
export function delGroup(id){
    return { type: DEL_GROUP, id}
}
export function changeTaskName(id, name){
    return { type: CHANGE_TASK_NAME, id, name }
}
export function changeTaskDate(id, date){
    return { type: CHANGE_TASK_DATE, id, date }
}
export function delTask(id){
    return { type: DEL_TASKS, id}
}

export function toggleTaskComplete(id){
    return { type: TOGGLE_TASK_COMPLETE, id}
}

