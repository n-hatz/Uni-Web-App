import { AUTH } from '../constants/actiontypes';
import {sign_in, sign_up} from '../api/index';

export const signIn = (formData, router) => async (dispatch) => {
    try {
        const {data} = await sign_in(formData);
        dispatch({type: AUTH, data});
        router.push('/');
    } catch (err) {
        console.log(err);
    }
};

export const signUp = (formData,router) => async (dispatch) => {
    try {
        const { data } = await sign_up(formData);
        dispatch({type: AUTH, data});
        router.push('/');
    } catch (err) {
        console.log(err);
    }
};