import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BlogHome from './containers/blog_home';
import SinglePost from './containers/single_post';
import App from './components/app';
import AddPost from './containers/add_post';
import RequireAuth from './containers/require-auth';
import Signup from './containers/sign_up';
import Signin from './containers/sign_in';

// routes for the app
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

// 3 unique routes
// home page with all posts
// add a new post page
// display a single post page
// sign up/in routes now included for hw5p2
export default(
  <Route path="/" component={App}>
    <IndexRoute component={BlogHome} />
    <Route path="posts/new" component={RequireAuth(AddPost)} />
    <Route path="posts/:id" component={SinglePost} />
    <Route path="/signup" component={Signup} />
    <Route path="/signin" component={Signin} />
  </Route>
);
