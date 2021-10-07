import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/forum/details/PostDetails';
import Navbar from './components/main/navbar/Navbar';
import ForumHome from './components/forum/forumhome/ForumHome';
import Auth from './components/auth/AuthForm';
import DeptHome from './components/main/departments/DeptHome';
import Info from './components/main/info/Info';
import ControlPanel from './components/admin/ControlPanel';
import AdminHome from './components/admin/AdminHome';
import Footer from './components/main/navbar/Footer';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/info" />} />
          <Route path="/forum" exact component={ForumHome} />
          <Route path="/forum/:id" exact component={PostDetails} />
          <Route path="/student" exact component={() => (!user ? <Auth /> : <Redirect to="/forum" />)} />
          <Route path="/departments" exact component={DeptHome} />
          <Route path="/info" exact component={Info} />
          <Route path="/admin" exact component={AdminHome} />
          <Route path="/admin/search" exact component={AdminHome} />
          <Route path="/admin/students/:id" exact component={ControlPanel} />
        </Switch>
        <Footer />
      </Container>
    </BrowserRouter>
  );
};

export default App;
