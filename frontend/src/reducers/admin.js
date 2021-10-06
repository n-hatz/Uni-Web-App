import { START_LOADING, END_LOADING,GET_ALL_STUDENTS,SEARCH_STUDENT,GET_STUDENT,ADD_GRADE,EDIT_GRADE,DELETE_GRADE } from "../constants/actiontypes";

export default (state = {isLoading: true, students: []},action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        case SEARCH_STUDENT:
            return {
                ...state,
                students: action.payload.data
            };
        case GET_ALL_STUDENTS:
            return {
                ...state,
                students: action.payload.data,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
            };
        case GET_STUDENT:
            return {
                ...state,
                student: action.payload.student
            };
        case ADD_GRADE:
            return {
                ...state,
                student: action.payload,
            };
        case EDIT_GRADE:
            return {
                ...state,
                student: action.payload,
            };
        case DELETE_GRADE:
            //console.log(state);
            const index = state.student.grades.findIndex(x => x._id === action.payload);
            if (index > -1) state.student.grades.splice(index,1);
            return {
                ...state,
            }
            /*
            return {
                ...state,
                student: state.students.map((student) => {
                    student.grades.filter((grade) => grade._id !== action.payload);
                })
            };
    
            return {
                ...state,
                students: state.students.map((student) => {
                    if (student._id === action.payload._id) {
                        return action.payload;
                    }
                    return student;
                }),
            };
            */
        default:
            return state;
    }
};