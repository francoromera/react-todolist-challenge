import uuid from 'uuid/v1';
import * as types from './types';
import {
    httpGet,
    httpPost,
    httpDelete,
    addMessage,
} from '../utils';

export const retrieveListItems = () => {
    return dispatch => {
        httpGet('/items').then(list => {
            dispatch({
                type: types.RETRIEVE_LIST_ITEMS_SUCCESS,
                payload: list.data,
            });
        }).catch(() => {
            dispatch({ type: types.RETRIEVE_LIST_ITEMS_FAILURE })
            addMessage(dispatch, 'error', 'Error reading list');
        });
    };
};

export const addListItem = (item) => {
    return dispatch => {
        item.id = uuid();
        dispatch({
            type: types.ADD_LIST_ITEM,
            payload: item,
        });
        httpPost('/items', item).then(() => {
            dispatch({
                type: types.ADD_LIST_ITEM_SUCCESS,
                payload: item,
            });
        }).catch(() => {
            dispatch({
                type: types.ADD_LIST_ITEM_FAILURE,
                payload: item,
            })
            addMessage(dispatch, 'error', 'Error adding item');
        });
    };
};

export const editListItem = (item, text) => {
    return dispatch => {
        const origText = item.name;
        dispatch({
            type: types.EDIT_LIST_ITEM,
            payload: { item, text: text },
        });
        httpPost(`/item/${item.id}`, item).then(() => {
            dispatch({
                type: types.EDIT_LIST_ITEM_SUCCESS,
                payload: { item, text: text },
            });
        }).catch(() => {
            dispatch({
                type: types.EDIT_LIST_ITEM_FAILURE,
                payload: { item, text: origText },
            })
            addMessage(dispatch, 'error', 'Error editing item');
        });
    };
};

export const removeListItem = (item) => {
    return dispatch => {
        dispatch({
            type: types.REMOVE_LIST_ITEM,
            payload: item,
        });
        httpDelete(`/item/${item.id}`, item).then(() => {
            dispatch({
                type: types.REMOVE_LIST_ITEM_SUCCESS,
                payload: item,
            });
        }).catch(() => {
            dispatch({
                type: types.REMOVE_LIST_ITEM_FAILURE,
                payload: item,
            })
            addMessage(dispatch, 'error', 'Error deleting item');
        });
    };
};
