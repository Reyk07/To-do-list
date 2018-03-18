
const groups = (state = [], action) => {
    switch (action.type) {
        case 'ADD_GROUP':
            return [...state,
                {
                  id: action.id,
                  name: action.name,
                }
              ]
        case "CHANGE_GROUP_NAME":
            return state.map(group => (group.id == action.id) ? { ...group, name: action.name } : group)
        case "DEL_GROUP":
        //console.log(state.filter(group => (group.id !== action.id)));
            return state.filter(group => (group.id != action.id))
        default:
            return state
    }
}

export default groups