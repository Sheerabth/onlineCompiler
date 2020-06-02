import { combineReducers } from 'redux'
import fileReducer from './fileReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
    file: fileReducer,
    error: errorReducer,
    auth: authReducer,
});