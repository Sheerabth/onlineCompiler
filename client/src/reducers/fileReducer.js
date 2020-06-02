import { defaultValue } from '../others/defaultValue'
import { CHANGE_NAME, CHANGE_MODE, CHANGE_VALUE, SAVE_FILE, SET_FILE} from '../actions/types'

const initState = {
    id: null,
    name: '',
    mode: 'java',
    value: defaultValue['java'],
}

const fileReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                name: action.name
            };
        case CHANGE_MODE:
            return {
                id: null,
                name: '',
                mode: action.mode,
                value: defaultValue[action.mode]
            };
        case CHANGE_VALUE:
            return {
                ...state,
                value: action.value
            };
        case SAVE_FILE:
            return state;
        case SET_FILE:
            return{
                ...state,
                id: action.file.id,
                name: action.file.name,
                mode: action.file.mode,
                value: action.file.value
            }
        default:
            return state;
    }
}

export default fileReducer;