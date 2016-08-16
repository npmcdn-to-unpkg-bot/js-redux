import React, { Component } from 'react';
import { signinUser } from '../actions';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// sign in a user to the blog
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

class Signin extends Component {
  constructor(props) {
    super(props);

    // state holds new user info
    this.state = {
      email: '',
      password: '',
    };
    this.updatingemail = this.updatingemail.bind(this);
    this.updatingpassword = this.updatingpassword.bind(this);
    this.enterClicked = this.enterClicked.bind(this);
    this.cancelClicked = this.cancelClicked.bind(this);
  }

  // email is being typed
  updatingemail(event) {
    this.setState({ email: event.target.value });
  }

  // password is being typed
  updatingpassword(event) {
    this.setState({ password: event.target.value });
  }

  // sign in user through action
  enterClicked() {
    this.props.signinUser({ email: this.state.email, password: this.state.password });
    // browserHistory.push('/');
  }

  // do not sign in user
  cancelClicked() {
    browserHistory.push('/');
  }

  // email and password fields
  render() {
    return (
      <div>
        <h3 id="np-head">Sign In</h3>
        <h3 id="np-head">*all fields required</h3>
        <div id="npf-full">
          <input id="npfInput" placeholder="Enter your email" value={this.state.email} onChange={this.updatingemail} />
          <input id="npfInput" placeholder="Enter your password" value={this.state.password} onChange={this.updatingpassword} />
          <div id="npfButtons">
            <input id="npfEnter" type="button" value="ENTER" onClick={this.enterClicked} />
            <input id="npfCancel" type="button" value="CANCEL" onClick={this.cancelClicked} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signinUser })(Signin);
