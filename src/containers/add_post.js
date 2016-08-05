import React, { Component } from 'react';
import { createpost } from '../actions';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

// add a new post page
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

class AddPost extends Component {
  constructor(props) {
    super(props);

    // state holds new post info
    this.state = { title: '', tags: '', content: '', ph: 'Add a title' };
    this.updatingTitle = this.updatingTitle.bind(this);
    this.updatingTags = this.updatingTags.bind(this);
    this.updatingContent = this.updatingContent.bind(this);
    this.enterClicked = this.enterClicked.bind(this);
    this.cancelClicked = this.cancelClicked.bind(this);
  }

  // title is being typed
  updatingTitle(event) {
    this.setState({ title: event.target.value });
  }

  // tags are being typed
  updatingTags(event) {
    this.setState({ tags: event.target.value });
  }

  // content is being typed
  updatingContent(event) {
    this.setState({ content: event.target.value });
  }

  // EXTRA CREDIT: Alert user if no title entered
  // create posted through action
  enterClicked() {
    if (this.state.title === '') {
      this.setState({ ph: '***Title required!' });
    } else {
      this.props.createpost({ title: this.state.title, tags: this.state.tags, content: this.state.content });
    }
  }

  // do not make post
  cancelClicked() {
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        <h3 id="np-head">New Post</h3>
        <div id="npf-full">
          <input id="npfInput" placeholder={this.state.ph} value={this.state.title} onChange={this.updatingTitle} />
          <input id="npfInput" placeholder="Add tags" value={this.state.tags} onChange={this.updatingTags} />
          <input id="npfInput" placeholder="Add content" value={this.state.content} onChange={this.updatingContent} />
          <div id="npfButtons">
            <input id="npfEnter" type="button" value="ENTER" onClick={this.enterClicked} />
            <input id="npfCancel" type="button" value="CANCEL" onClick={this.cancelClicked} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { createpost })(AddPost);
