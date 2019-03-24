const initialState = [];
   
const MessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            return [ ...state, action.payload ];
        case 'REMOVE_MESSAGE':
            return state.filter(m => m !== action.payload);
        default:
            return state;
    }
}

export default MessagesReducer;
