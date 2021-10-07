import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid, Card, CardContent } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';

import { get_post } from '../../../actions/posts';
import Comments from './Comments';
import useStyles from './styles';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(get_post(id));
  }, [id]);

  const handleClick = (id) => history.push(`/forum/${id}`);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  const authorPosts = posts.filter(({_id,authorId}) => _id!==post._id && authorId==post.authorId);  //posts of same author

  return (
    <>
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h6">&#128100; {post.author} | &#128368; {moment(post.createdAt).fromNow()}</Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Typography variant="h4" component="h4">{post.title}</Typography>
            <Typography gutterBottom variant="body1" component="p">{post.body}</Typography>
            <Divider style={{ margin: '10px 0' }} />
            <Comments post={post} />
            <Divider style={{ margin: '10px 0'}} />
            <Typography gutterBottom variant="h6">Other posts by {post.author}:</Typography>
            <Grid classname={classes.container} container alignItems="stretch" spacing={12}>
              {!!authorPosts.length && (  //double !! so 0 doesn't show
                <div className={classes.section2}>
                  {authorPosts.map((p) => (
                    <Grid key={p._id} onClick={() => handleClick(p._id)} style={{ margin: '20px', cursor: 'pointer', }} item xs={12} sm={12} md={6} lg={3}>
                      <Card className={classes.card2} raised elevation={6} >
                        <Typography className={classes.title} gutterBottom variant="h6">{p.title}</Typography>
                        <CardContent>
                          <Typography gutterBottom variant="subtitle2">{p.body.split(' ').splice(0, 20).join(' ')}...</Typography>
                        </CardContent>
                        <Typography className={classes.title} gutterBottom variant="subtitle1">{p.comments.length} comments</Typography>
                      </Card>
                    </Grid>
                  ))}
                </div>
              )}
            </Grid>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default PostDetails;