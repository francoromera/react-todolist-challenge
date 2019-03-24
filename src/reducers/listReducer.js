import * as types from '../actions/types';

const initialState = [];
   
const ListReducer = (state = initialState, action) => {
    let existing;
    let listWithoutExisting;
    switch (action.type) {
        case types.RETRIEVE_LIST_ITEMS_SUCCESS:
            return [ ...action.payload ];
        case types.ADD_LIST_ITEM:
            return [ ...state, action.payload ];
        case types.ADD_LIST_ITEM_FAILURE:
            return state.filter(it => it.id !== action.payload.id);
        case types.EDIT_LIST_ITEM:
            existing = action.payload.item;
            listWithoutExisting = state.filter(it => it.id !== existing.id);
            return [ ...listWithoutExisting, { ...existing, name: action.payload.text } ];
        case types.EDIT_LIST_ITEM_FAILURE:
            existing = action.payload.item;
            listWithoutExisting = state.filter(it => it.id !== existing.id);
            return [ ...listWithoutExisting, { ...existing, name: action.payload.text } ];
        case types.REMOVE_LIST_ITEM:
            return state.filter(it => it.id !== action.payload.id);
        case types.REMOVE_LIST_ITEM_FAILURE:
            return [ ...state, action.payload ];
        default:
            return state;
    }
}

export default ListReducer;
