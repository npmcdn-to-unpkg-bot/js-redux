import React, { Component } from 'react';
import { signupUser } from '../actions';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// sign up a user for this blog
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

class Signup extends Component {
  constructor(props) {
    super(props);

    // state holds new post info
    this.state = {
      email: '',
      username: '',
      password: '',
    };
    this.updatingemail = this.updatingemail.bind(this);
    this.updatingusername = this.updatingusername.bind(this);
    this.updatingpassword = this.updatingpassword.bind(this);
    this.enterClicked = this.enterClicked.bind(this);
    this.cancelClicked = this.cancelClicked.bind(this);
  }

  // email is being typed
  updatingemail(event) {
    this.setState({ email: event.target.value });
  }

  // username is being typed
  updatingusername(event) {
    this.setState({ username: event.target.value });
  }

  // password is being typed
  updatingpassword(event) {
    this.setState({ password: event.target.value });
  }

  // sign up user through action
  enterClicked() {
    this.props.signupUser({ email: this.state.email, password: this.state.password, username: this.state.username });
  }

  // do not sign up user
  cancelClicked() {
    browserHistory.push('/');
  }

  // all 3 fields for sign up
  // email user password
  // username used for post author
  render() {
    return (
      <div>
        <h3 id="np-head">Sign Up</h3>
        <h3 id="np-head">*all fields required</h3>
        <div id="npf-full">
          <input id="npfInput" placeholder="Enter your email" value={this.state.email} onChange={this.updatingemail} />
          <input id="npfInput" placeholder="Enter a username" value={this.state.username} onChange={this.updatingusername} />
          <input id="npfInput" placeholder="Enter a password" value={this.state.password} onChange={this.updatingpassword} />
          <div id="npfButtons">
            <input id="npfEnter" type="button" value="ENTER" onClick={this.enterClicked} />
            <input id="npfCancel" type="button" value="CANCEL" onClick={this.cancelClicked} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signupUser })(Signup);
