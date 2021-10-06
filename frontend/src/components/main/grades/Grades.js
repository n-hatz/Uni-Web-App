import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress,Grid, Card } from "@material-ui/core";
import useStyles from "./styles";

const Grades = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { grades, isLoading } = useSelector((state) => state.student);
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        dispatch(get_student(user.result._id));
    },[user])

    if (!grades.length && !isLoading) return 'No grades yet.';

    return ( 
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {grades?.map((grade) => (
                    <Grid key={grade._id} item xs={12} sm={12} md={6} lg={6}>
                        <Card className={classes.card} raised elevation={6}>
                            <div className={classes.overlay}>
                                <Typography variant="h6">Student: {student.name}</Typography>
                                <Typography variant="body2">Location: {department.building}</Typography>
                            </div>
                            <div className={classes.overlay}>
                                {
                                    //MAYBE MAKE AN ACCORDION FOR EACH SEMESTER, SO MAKE IT A SEPARATE COMPONENT
                                }
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="courses-content"
                                        id="courses-header"
                                    >
                                        <Typography variant="h6" component="h6">First semester</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid>
                                            {department.courses.map((course) => (
                                                <Typography key={course._id} gutterBottom variant="body1" component="p">[{course.code}] {course.name} - taught by prof. {course.prof}</Typography>
                                            ))}  
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    );
}
 
export default Grades;