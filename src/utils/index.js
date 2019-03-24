const URL_BASE = 'https://someapi';

export const httpGet = (url) => {
    return fetch(`${URL_BASE}${url}`).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject('error');
        }
    });
};

export const httpPost = (url, body) => {
    return fetch(`${URL_BASE}${url}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject('error');
        }
    });
};

export const httpDelete = (url, body) => {
    return fetch(`${URL_BASE}${url}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject('error');
        }
    });
};

export const addMessage = (dispatch, type, text) => {
    const message = {
        type,
        text,
    };
    dispatch({
        type: 'ADD_MESSAGE',
        payload: message,
    });
    setTimeout(() => {
        dispatch({
            type: 'REMOVE_MESSAGE',
            payload: message
        });
    }, 3000);
};