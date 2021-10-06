import {ADD_POST,EDIT_POST,DELETE_POST,GET_ALL_POSTS,GET_POST,ADD_COMMENT,DELETE_COMMENT,START_LOADING, END_LOADING} from '../constants/actiontypes';

export default (state = {isLoading: true, posts: []},action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload.data,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload.post
            };
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case EDIT_POST:
            return {
                ...state,
                posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload)
            };
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                }
                return post;
                }),
            };
        case DELETE_COMMENT:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                return post;
                }),
            };
        default:
            return state;
    }
};