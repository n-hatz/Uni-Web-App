import { AUTH, LOGOUT} from '../constants/actiontypes';

const authReducer = (state = {authData: null}, action) => {
    switch(action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action.data,isLoading: false, errors: null};
        
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null, isLoading: false, errors: null};

        default: 
            return state;
    }
};

export default authReducer;