import React, {useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import Department from './Department';
import {get_departments} from '../../../actions/depts';

const DeptHome = () => {
    const { depts, isLoading } = useSelector((state) => state.depts);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(get_departments());
        //console.log(depts);
    },[])

    if (!depts.length && !isLoading) return 'No depts';

    return ( 
        isLoading ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {depts?.map((dept) => (
                    <Grid key={dept._id} item xs={12} sm={12} md={6} lg={6}>
                        <Department department={dept} />
                    </Grid>
                ))}
            </Grid>
        )
     );
};
 
export default DeptHome;