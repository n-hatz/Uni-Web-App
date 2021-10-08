import { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams,useHistory } from "react-router";
import { Paper,CircularProgress,Grow,Grid,Container } from "@material-ui/core";

import { get_student } from "../../actions/admin";
import GradesForm from "./GradesForm";
import GradesTable from "./GradesTable";
import useStyles from "./styles";

const ControlPanel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [currentId,setCurrentId] = useState(0);

  const { student, students, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(get_student(id));
  },[id]);

  if(!student) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return ( 
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={6}>
            <GradesTable setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <GradesForm currentId={currentId} setCurrentId={setCurrentId} student={student} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
   );
}
 
export default ControlPanel;