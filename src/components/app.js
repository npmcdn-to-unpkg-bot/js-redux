import React, { Component } from 'react';
import { Link } from 'react-router';

// app background with title always displayed
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

// example class based component (smart component)
class App extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {};
  }

  render() {
    return (
      <div>
        <div id="top-link-div">
          <Link to="/"><h1 id="top-link">HW4 Blog by Josh Kerber</h1></Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
