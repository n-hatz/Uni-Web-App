import { useDispatch, useSelector } from "react-redux";
import { Paper,TableContainer,Table,TableHead,TableRow,TableCell,TableBody,Button,ButtonBase } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import { delete_grade } from "../../actions/admin";
import { useEffect } from "react";

const GradesTable = ({ setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const student = useSelector((state) => state.admin.student);

    useEffect(() => {
        //
    },[student]);

    return ( 
        (
        <Paper className={classes.paper} elevation={6}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Course code</TableCell>
                            <TableCell>Mark (out of 10)</TableCell>
                            <TableCell>Semester taken</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {student?.grades?.map((grade) => (
                            <TableRow key={grade._id}>
                                <TableCell>
                                    <Button size="small" color="secondary" onClick={() => setCurrentId(grade._id)}>
                                    {grade.code}
                                    </Button>
                                </TableCell>
                                <TableCell>{grade.mark}</TableCell>
                                <TableCell>{grade.semester}</TableCell>
                                <TableCell>
                                    <Button size="small" color="secondary" onClick={() => dispatch(delete_grade(student._id,grade._id))}>
                                        <DeleteIcon fontSize="small" /> &nbsp; Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        )
     );
}
 
export default GradesTable;