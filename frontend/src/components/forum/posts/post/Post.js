import React from 'react';
import { Card, CardActions, CardContent, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { delete_post } from '../../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
  
    const openPost = (e) => {
      history.push(`/forum/${post._id}`);
    };
  
    return (
      <Card className={classes.card} raised elevation={6}>
        <ButtonBase
          component="span"
          name="test"
          className={classes.cardAction}
          onClick={openPost}
        >
          <Typography className={classes.title} color="textSecondary" gutterBottom></Typography>
          {(user?.result?._id === post?.authorId) && (
          <div className={classes.overlay2} name="edit">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
              style={{ color: 'secondary' }}
              size="small"
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
          )}
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{post.body.split(' ').splice(0, 20).join(' ')}...</Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          {(user?.result?._id === post?.authorId) && (
            <Button size="small" color="secondary" onClick={() => dispatch(delete_post(post._id))}>
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
          )}
        </CardActions>
      </Card>
    );
  };
  
  export default Post;