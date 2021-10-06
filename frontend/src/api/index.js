import axios from 'axios';

const api = axios.create({baseURL: 'http://localhost:5000/api'});

api.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const sign_in = (data) => api.post('/student/signin',data);
export const sign_up = (data) => api.post('/student/signup',data);

export const get_depts = () => api.get('/departments');

export const admin_sign_in = (data) => api.post('/admin/signin',data);
export const search_student = (query) => api.get(`/admin/search?username=${query.username || 'none'}&major=${query.major || 'none'}`);
export const get_students = (page) => api.get('/admin/students?page='+page);
export const student_by_id = (id) => api.get('/admin/students/'+id);
export const add_grade = (id,grade) => api.post('/admin/grades/'+id,grade);
export const edit_grade = (id,grade_id,grade) => api.patch('/admin/grades/'+id,{grade_id,grade});
export const delete_grade = (id,grade_id) => api.delete('/admin/students/'+id+'/grades/'+grade_id);

export const get_posts = (page) => api.get('/forum?page='+page);
export const post_by_id = (id) => api.get('/forum/'+id);
export const new_post = (post) => api.post('/forum/new',post);
export const edit_post = (id,post) => api.patch('/forum/'+id,post);
export const delete_post = (id) => api.delete('/forum/'+id);
export const add_comment = (id,comment) => api.post('/forum/comment/'+id,comment);
export const delete_comment = (id,cid) => api.delete('/forum/comment?pid='+id+'&cid='+cid);
