import { CHANGE_NAME, CHANGE_MODE, CHANGE_VALUE, SAVE_FILE, SET_FILE, DELETE_FILE, USER_LOADED } from './types'
import axios from 'axios'
import uuid from 'uuid';
import { tokenConfig } from '../actions/authActions';

export const saveFile = userId => (dispatch, getState) => {
    const state = getState();
    if (state.file.id === null) {
        console.log('am in dude');
        axios
            .post(`http://127.0.0.1:9000/api/files/${userId}`,
                {
                    id: uuid(),
                    name: state.file.name,
                    mode: state.file.mode,
                    value: state.file.value
                }, tokenConfig(getState))
            .then(res => {
                dispatch({ type: SAVE_FILE })
            })
            .catch(err => console.log(err))
    }
    else {
        console.log("am not in dude");
        axios
            .post(`http://127.0.0.1:9000/api/files/modify/${userId}`,
                {
                    id: state.file.id,
                    name: state.file.name,
                    mode: state.file.mode,
                    value: state.file.value
                }, tokenConfig(getState))
            .then(res => {
                dispatch({ type: SAVE_FILE })
            })
            .catch(err => console.log(err))
    }
}

export const deleteFile = (userId, id) => (dispatch, getState) => {
    axios
        .post(`http://127.0.0.1:9000/api/files/delete/${userId}`, 
            {
                id: id
            }, tokenConfig(getState))
        .then(res => {
            dispatch({ type: DELETE_FILE })
            dispatch({
                type: USER_LOADED,
                payload: res.data.user
              })
        })
        .catch(err => console.log(err));
}

export const changeName = (name) => {
    return {
        type: CHANGE_NAME,
        name
    }
}

export const changeMode = (mode) => {
    return {
        type: CHANGE_MODE,
        mode
    }
}

export const changeValue = (value) => {
    return {
        type: CHANGE_VALUE,
        value
    }
}

export const setFile = (file) => {
    return {
        type: SET_FILE,
        file
    }
}
