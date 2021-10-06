import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography,Radio,RadioGroup, Container,Checkbox,FormControlLabel,FormControl,FormLabel } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { signIn, signUp } from '../../actions/auth';
import { adminSignIn } from '../../actions/admin';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstname: '', lastname: '', username: '', password: '', confirmPassword: '', major: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [userType,setUserType] = useState("student");
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setUserType("student");
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "admin") {
      dispatch(adminSignIn(form,history));
    } else if (isSignup) {
      dispatch(signUp(form, history));
    } else {
      dispatch(signIn(form, history));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRadioChange = (e) => {
    setUserType(e.target.value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        { !isSignup && 
          <FormControl component="fieldset">
          <FormLabel component="legend">Login as: </FormLabel>
          <RadioGroup aria-label="login as" name="usertype" value={userType} onChange={handleRadioChange}>
            <FormControlLabel value="student" control={<Radio defaultChecked />} label="Student" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
          </FormControl>
        }
        
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastname" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="username" label="Username" handleChange={handleChange} />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && 
            <>
                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                <Input name="major" label="Major" handleChange={handleChange} />
            </>
             }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { userType === "admin" ? 'Admin login' : isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;