import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

// credit to Tim Tregubov and the cs52 hw5 part 2 walkthrough
// hosted at http://cs52.me/assignments/hw5p2/

export default function (ComposedComponent) {
  class RequireAuth extends Component {
    constructor(props) {
      super(props);

      // init component state here
      this.state = {};
    }
    componentWillMount() {
      if (!this.props.authenticated) {
        browserHistory.push('/signin');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        browserHistory.push('/signin');
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  // mapStateToProps
  const mapStateToProps = (state) => ({ authenticated: state.auth.authenticated });

  return connect(mapStateToProps, null)(RequireAuth);
}
