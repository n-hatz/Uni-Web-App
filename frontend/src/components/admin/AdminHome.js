import { Grow,Container,Grid,Paper,Typography,TextField,Button,AppBar, FormControl, InputLabel, Select, Divider } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import useStyles from './styles';
import StudentList from "./StudentList";
import Pagination from "../forum/pagination/Pagination";
import { search_student } from "../../actions/admin";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const AdminHome = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const query = useQuery();
    
    const page = query.get('page') || 1;
    const query_username = query.get('username');
    const query_major = query.get('major');

    const [username, setUsername] = useState("");
    const [major,setMajor] = useState("");

    const searchStudent = () => {
        if(username.trim() || major.trim()) {
          dispatch(search_student({username,major}));
          history.push(`/admin/search?username=${username || 'none'}&major=${major || 'none'}`);
        } else {
          history.push('/admin');
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
          searchStudent();
        }
    };
    
    return (
        <Grow in>
            <Container maxWidth="xl">
                <div>
                    <Typography className={classes.label} variant="h6">Search students: </Typography>                      
                    <TextField size="small" margin="dense"  variant="outlined" onKeyDown={handleKeyPress} name="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="major-select">Major</InputLabel>
                        <Select native value={major} onChange={(e) => setMajor(e.target.value)} inputProps={{name: 'major', id: "major-select"}}>
                            <option aria-label="None" value="" />
                            <option value={"CS"}>Computer Science</option>
                            <option value={"Politics"}>Politics</option>
                            <option value={"Math"}>Maths</option>
                            <option value={"EE"}>Electrical Engineering</option>
                        </Select>
                    </FormControl>
                    <Button onClick={searchStudent} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                </div>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={6}>
                       {//
                       <StudentList /> 
                       } 
                    </Grid>
                </Grid>
                {
                    (!query_username && !query_major) && (page) && (
                        <Paper className={classes.pagination} elevation={6}>
                           <Pagination page={page} type={"students"} />
                        </Paper>
                    )
                }
            </Container>
        </Grow> 
     );
}
 
export default AdminHome
;