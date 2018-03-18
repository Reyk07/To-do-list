const initialState = {
  groups: [],
  tasks: []
};

const tasks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: action.id,
          groupId: action.groupId,
          name: action.name,
          date: action.date,
          completed: false
        }
      ]
    case "DEL_TASKS_OF_GROUP":
      return state.filter(task => (task.groupId != action.groupId));
    case "DEL_TASKS":
      return state.filter(task => (task.id != action.id));
    case "CHANGE_TASK_NAME":
      return state.map(task => (task.id == action.id) ? { ...task, name: action.name } : task)
    case "CHANGE_TASK_DATE":
      return state.map(task => (task.id == action.id) ? { ...task, date: action.date } : task)
    case "TOGGLE_TASK_COMPLETE":
      return state.map(task => (task.id == action.id) ? { ...task, completed: !task.completed } : task)
    /*case 'TOGGLE_TODO':
      return state.map(task =>
        (task.id === action.id)
          ? {...task, completed: !task.completed}
          : task
      )*/
    default:
      return state
  }
}

export default tasks