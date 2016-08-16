import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signoutUser } from '../actions';

// header with logo used to add a new post
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

class Header extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
    // this.signOutClicked = this.signOutClicked.bind(this);
  }

  render() {
    // get user authenticated boolen from auth reducer props
    const userIsAuth = this.props.authenticated;
    if (userIsAuth) { // a user is signed in // sign out/new post
      return (
        <div id="text-input">
          <img src={'./../../images/sa4_logo.png'} alt="boohoo" className="img-responsive" />
          <Link id="new-post-link" to="posts/new"><div id="new-post-div">New Post</div></Link>
          <Link id="sign-out-link" to="/" onClick={this.props.signoutUser}><div id="sign-out-div">Sign Out</div></Link>
        </div>
      );
    } else {
      return (  // no user is signed in // show sign in/sign up
        <div id="text-input">
          <img src={'./../../images/sa4_logo.png'} alt="boohoo" className="img-responsive" />
          <Link id="sign-in-link" to="/signin"><div id="sign-in-div">Sign In</div></Link>
          <Link id="sign-up-link" to="/signup"><div id="sign-up-div">Sign Up</div></Link>
        </div>
      );
    }
  }
}

// send authenticated state to props
const toPropsSendState = (state) => ({ all: state.blog_posts.all, authenticated: state.auth.authenticated });

export default connect(toPropsSendState, { signoutUser })(Header);
