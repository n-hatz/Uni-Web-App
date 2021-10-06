import { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { add_grade, edit_grade } from '../../actions/admin';

const GradesForm = ({currentId,setCurrentId,student}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const [gradeData,setGradeData] = useState({code: '', mark: '', semester: ''});
    const grade = student?.grades?.find((grade) => grade._id === currentId);

    useEffect(() => {
        if(!student || !grade) clear();
        if(grade) setGradeData(grade);
    },[student,grade])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentId === 0) {
            dispatch(add_grade(student._id,{...gradeData}));
            setGradeData({code: '', mark: '', semester: ''});
        } else {
            dispatch(edit_grade(student._id,gradeData._id, {...gradeData}));
            setGradeData({code: '', mark: '', semester: ''});
        }
    }

    const clear = () => {
        setGradeData({code: '', mark: '', semester: ''});
        setCurrentId(0);
    }

    if(!student) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Enter a valid username to view/edit grades.
                </Typography>
            </Paper>
        )
    }

    return ( 
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing: ${gradeData.code} of ${student?.username}` : 'Add grade'}</Typography>
                { currentId ? <TextField name="code" variant="outlined" label="Code" fullWidth value={gradeData.code} disabled />
                : <TextField name="code" variant="outlined" label="Code" fullWidth value={gradeData.code} onChange={(e) =>setGradeData({...gradeData, code: e.target.value})} /> }
                <TextField name="mark" variant="outlined" label="Mark" fullWidth value={gradeData.mark} onChange={(e) => setGradeData({ ...gradeData, mark: e.target.value })} />
                <TextField name="semester" variant="outlined" label="Semester" fullWidth value={gradeData.semester} onChange={(e) => setGradeData({ ...gradeData, semester: e.target.value })} />
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
     );
}
 
export default GradesForm;