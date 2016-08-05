import React, { Component } from 'react';
import { Link } from 'react-router';
import { deletepost } from '../actions';
import { connect } from 'react-redux';
import marked from 'marked';

// single blog post preview when all posts are displayed
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

// example class based component (smart component)
class BlogPost extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      refresh: '',
    };
  }

  render() {
    // get info from props
    const titleText = this.props.title;
    const tagsText = this.props.tags;
    return (
      <div>
        <Link to={`posts/${this.props.postId}`}>
          <div id="blog-post">
            <div dangerouslySetInnerHTML={{ __html: marked(titleText || '') }}></div>
            <div id="tags-home" dangerouslySetInnerHTML={{ __html: marked(tagsText || '') }}></div>
          </div>
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => ({ post: state.blog_posts.post });

export default connect(mapDispatchToProps, { deletepost })(BlogPost);
