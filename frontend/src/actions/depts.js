import { START_LOADING, END_LOADING, GET_DEPTS } from '../constants/actiontypes';
import * as api from '../api/index';

export const get_departments = () => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.get_depts();
        dispatch({type: GET_DEPTS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};