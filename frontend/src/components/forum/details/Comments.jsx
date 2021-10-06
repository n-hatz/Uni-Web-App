import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { add_comment, delete_comment } from '../../../actions/posts';
import useStyles from './styles';

const Comments = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(add_comment(post._id,{author: user.result.name, authorId: user.result._id, body}));

    setBody('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (comment) => {
    const newComments = await dispatch(delete_comment(post._id,comment._id))

    setComments(newComments);
    commentsRef.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer} style={{ width: '30%'}}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((comment) => (
            <Typography key={comment._id} gutterBottom variant="subtitle1">
              <strong>{comment.author}: </strong>
              {comment.body }
              {user?.result?._id === comment.authorId && <Button color="secondary" onClick={() => handleDelete(comment)}>Delete</Button>}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={body} onChange={(e) => setBody(e.target.value)} />
          <br />

          { user ? 
            <Button style={{ marginTop: '10px' }} fullWidth disabled={!body.length} color="primary" variant="contained" onClick={handleComment}>
              Comment
            </Button>
          :
          <Typography gutterBottom variant="h6">Sign in to comment</Typography>
          }
          
        </div>
      </div>
    </div>
  );
};

export default Comments;