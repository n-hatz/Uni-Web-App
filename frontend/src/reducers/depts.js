import { START_LOADING, END_LOADING, GET_DEPTS } from "../constants/actiontypes";

export default (state = {isLoading: true, depts: []}, action) => {
    switch(action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        case GET_DEPTS:
            return {
                ...state,
                depts: action.payload.data
            };
        default:
            return state;
    }
};