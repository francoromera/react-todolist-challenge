import { combineReducers } from "redux";

import list from '../reducers/listReducer';
import messages from '../reducers/messagesReducer';

export default combineReducers({
    list,
    messages,
});