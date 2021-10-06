import { START_LOADING, END_LOADING, GET_ALL_POSTS, GET_POST, ADD_POST, EDIT_POST, DELETE_POST, ADD_COMMENT, DELETE_COMMENT } from '../constants/actiontypes';
import * as api from '../api/index';

export const get_post = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const {data} = await api.post_by_id(id);
        dispatch({type: GET_POST, payload: {post: data} });
        dispatch({type: END_LOADING });
    } catch (err) {
        console.log(err);
    }
};

export const get_all_posts = (pagee) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data, page, totalPages } } = await api.get_posts(pagee);
  
      dispatch({ type: GET_ALL_POSTS, payload: { data, page, totalPages } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
};

export const add_post = (post,history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.new_post(post);
    
        dispatch({ type: ADD_POST, payload: data });
    
        history.push(`/forum/${data._id}`);
      } catch (error) {
        console.log(error);
      }
};

export const edit_post = (id,post) => async (dispatch) => {
    try {
        const { data } = await api.edit_post(id,post);
        dispatch({type: EDIT_POST, payload: data});
    } catch (err) {
        console.log(err);
    }
};

export const delete_post = (id) => async (dispatch) => {
    try {
        await api.delete_post(id);
        dispatch({type: DELETE_POST, payload: id});
    } catch (err) {
        console.log(err);
    }
};

export const add_comment = (id,comment) => async (dispatch) => {
    try {
        const { data } = await api.add_comment(id,comment);
        dispatch({type: ADD_COMMENT, payload: data});
        return data.comments;
    } catch (err) {
        console.log(err);
    }
};

export const delete_comment = (id,cid) => async (dispatch) => {
    try {
        const { data } = await api.delete_comment(id,cid);
        dispatch({type: DELETE_COMMENT, payload: data});
        return data.comments;
    } catch (err) {
        console.log(err);
    }
};