/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { get_all_posts } from '../../../actions/posts';
import { get_all_students } from '../../../actions/admin';
import useStyles from './styles';

const Paginate = ({ page, type }) => {
  const { totalPages } = useSelector((state) => (type==="posts" ? state.posts : state.admin));
  const test = useSelector((state) => state);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      if(type==="posts")  dispatch(get_all_posts(page));
      else if (type==="students") dispatch(get_all_students(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={totalPages || 1}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={type==="posts" ? `/forum?page=${item.page}` : `/admin/students?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;