import { Grid, CircularProgress, ButtonBase, Typography, CardContent,Card } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';

const StudentList = () => {
    const classes = useStyles();
    const history = useHistory();
    const { students, isLoading } = useSelector((state) => state.admin);

    if(!students.length && !isLoading) return 'No students';

    const openStudent = (id) => {
        history.push('/admin/students/'+id);
    }

    return ( 
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {students?.map((student) => (
                    <Grid key={student._id} item xs={12} sm={12} md={6} lg={6}>
                        <Card className={classes.card} raised elevation={6}>
                            <ButtonBase component="span" name="student_card_buttonbase" className={classes.cardAction} onClick={() => openStudent(student._id)}>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">{student.username}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">{student.major}</Typography>
                                </CardContent>
                            </ButtonBase>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
     );
}
 
export default StudentList;
