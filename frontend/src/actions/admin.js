import { START_LOADING, END_LOADING,GET_ALL_STUDENTS,SEARCH_STUDENT,GET_STUDENT,ADD_GRADE,EDIT_GRADE,DELETE_GRADE, AUTH } from "../constants/actiontypes";
import * as api from '../api/index';

export const adminSignIn = (formData,router) => async (dispatch) => {
    try {
        const {data} = await api.admin_sign_in(formData);
        dispatch({type: AUTH, data});
        router.push('/admin');
    } catch (err) {
        console.log(err);
    }
};

export const get_student = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.student_by_id(id);
        dispatch({type: GET_STUDENT, payload: {student: data} });
        dispatch({type: END_LOADING});
    } catch (err) {
        console.log(err);
    }
};

export const get_all_students = (pagee) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING });
        const { data: { data, page, totalPages } } = await api.get_students(pagee);

        dispatch({ type: GET_ALL_STUDENTS, payload: { data, page, totalPages } });
        dispatch({ type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

export const search_student = (query) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data: { data } } = await api.search_student(query);
        dispatch({type: SEARCH_STUDENT, payload: { data } });
        dispatch({type: END_LOADING});
    } catch (err) {
        console.log(err);
    }
};

export const add_grade = (id,grade) => async (dispatch) => {
    try {
        const { data } = await api.add_grade(id,grade);
        //console.log();
        dispatch({type: ADD_GRADE, payload: data});
        return data.grades;
    } catch (err) {
        console.log(err);
    }
};

export const edit_grade = (id,grade_id,grade) => async (dispatch) => {
    try {
        const {data} = await api.edit_grade(id,grade_id,grade);
        dispatch({type: EDIT_GRADE, payload: data});
        return data.grades;
    } catch (err) {
        console.log(err);
    }
};

export const delete_grade = (id,grade_id) => async (dispatch) => {
    try {
        //const {data} = 
        await api.delete_grade(id,grade_id);
        dispatch({type: DELETE_GRADE, payload: grade_id});
        //maybe id aswell above?
        //return data.grades;
    } catch (err) {
        console.log(err);
    }
};