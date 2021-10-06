import { Card,Typography,Grid,Accordion,AccordionSummary,AccordionDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import useStyles from './styles';

const Department = ({department}) => {
    const classes = useStyles();

    return ( 
        <Card className={classes.card} raised elevation={6}>
          <div className={classes.overlay}>
            <Typography variant="h6">Department of {department.name}</Typography>
            <Typography variant="body2">Location: {department.building}</Typography>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="courses-content"
                id="courses-header"
              >
                <Typography variant="h6" component="h6">Courses</Typography>
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
     );
}
 
export default Department;