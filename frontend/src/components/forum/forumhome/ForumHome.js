import React, { useState } from 'react';
import { Container, Grow, Grid, Paper } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

import PostList from '../posts/PostList';
import PostForm from '../form/PostForm';
import Pagination from '../pagination/Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ForumHome = () => {
  const classes = useStyles();
  const query = useQuery();
  const page = query.get('page') || 1;

  const [currentId, setCurrentId] = useState(0);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <PostList setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <PostForm currentId={currentId} setCurrentId={setCurrentId} />
            {page && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} type={"posts"} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default ForumHome;