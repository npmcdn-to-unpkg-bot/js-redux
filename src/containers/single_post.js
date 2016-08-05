import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchpost, updatepost, deletepost } from '../actions';
import { browserHistory } from 'react-router';
import marked from 'marked';

// display a single, editable blog post
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

class SinglePost extends Component {
  constructor(props) {
    super(props);

    // state holds title tags and content for edit updates
    this.state = {
      isEditing: 'false',
      title: '',
      tags: '',
      content: '',
    };

    // bind all methods
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.beginEditing = this.beginEditing.bind(this);
    this.doneEditing = this.doneEditing.bind(this);
    this.deleteCurrentPost = this.deleteCurrentPost.bind(this);
  }
  componentWillMount() {
    // fetch the post for this compenent
    this.props.fetchpost(this.props.params.id);
  }
  // function below adapted from http://stackoverflow.com/questions/34884114/react-js-componentwillreceiveprops-only-updates-every-other-this-props-update
  // componentWillReceiveProps recieving new props then updating state
  componentWillReceiveProps(recvProps) {
    // set state fields vars when new props are recieved
    if (recvProps.post) {
      this.setState({
        title: recvProps.post.title,
        tags: recvProps.post.tags,
        content: recvProps.post.content,
      });
    }
  }
  /* ==================== changes while editing ================*/
  // user typing title
  onTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }
  // user typing tags
  onTagsChange(event) {
    this.setState({
      tags: event.target.value,
    });
  }
  // user typing content
  onContentChange(event) {
    this.setState({
      content: event.target.value,
    });
  }
  // state changed to editing, page is updated with text input fields
  beginEditing() {
    this.setState({ isEditing: 'true' });
    console.log(`state editing is now ${this.state.isEditing}`);
  }
  // user is done editing, update the post with new fields using the updatepost action from actions/index.js
  doneEditing() {
    this.props.updatepost({ title: this.state.title, content: this.state.content, tags: this.state.tags }, this.props.params.id);
    this.setState({ isEditing: 'false' });
    console.log(`state editing is now ${this.state.isEditing}`);
  }
  /* ==================== end of changes while editing ========== */
  deleteCurrentPost() {
    // delete the post using the deletepost action from actions/index.js
    this.props.deletepost(this.props.params.id);
  }
  backHome() {
    // go back to home page
    browserHistory.push('/');
  }
  render() {
    if (this.state.isEditing === 'true') {
      // show text input fields and check icon when user is editing
      return (
        <div>
          <i className="material-icons" onClick={this.backHome}>backspace</i><h3 id="back-bpf">BACK</h3>
          <div id="blog-post-full">
            <input className="edit-post-bpf" onChange={this.onTitleChange} type="text" value={this.state.title} />
            <input className="edit-post-bpf" onChange={this.onTagsChange} type="text" value={this.state.tags} />
            <input className="edit-post-bpf" onChange={this.onContentChange} type="text" value={this.state.content} />
            <i className="material-icons" onClick={this.doneEditing}>check_circle</i>
            <h3>*Markdown syntax supported</h3>
          </div>
        </div>
      );
    } else {
      // user isn't editing but the page has yet to get a post to display (probably loading)
      if (!this.props.post) {
        return (
          <div>
            <i className="material-icons" onClick={this.backHome}>backspace</i><h3 id="back-bpf">BACK</h3>
          </div>
        );
      } else {
        // display a post
        return (
          <div>
            <i className="material-icons" onClick={this.backHome}>backspace</i><h3 id="back-bpf">BACK</h3>
            <div id="blog-post-full">
              <h2 id="bgf-header">&#8226; TITLE:</h2><div id="bgf-content" dangerouslySetInnerHTML={{ __html: marked(this.props.post.title || '') }}></div>
              <h2 id="bgf-header">&#8226; TAGS:</h2><div id="bgf-content" dangerouslySetInnerHTML={{ __html: marked(this.props.post.tags || '') }}></div>
              <h2 id="bgf-header">&#8226; CONTENT:</h2><div id="bgf-content" dangerouslySetInnerHTML={{ __html: marked(this.props.post.content || '') }}></div>
              <i className="material-icons" onClick={this.deleteCurrentPost}>delete_forever</i>
              <i className="material-icons" onClick={this.beginEditing}>mode_edit</i>
            </div>
          </div>
        );
      }
    }
  }
}

const mapDispatchToProps = (state) => ({ post: state.blog_posts.post });

export default connect(mapDispatchToProps, { fetchpost, updatepost, deletepost })(SinglePost);
