import React, { Component } from 'react';
import Header from '../components/header';
import BlogPost from '../components/blog_post';
import { connect } from 'react-redux';
import { fetchposts } from '../actions';

// home page of blog with all blog post previews displayed
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

class BlogHome extends Component {
  componentWillMount() {
    // get posts from action
    this.props.fetchposts();
  }

  render() {
    // get map holding posts from props
    let AllPosts = this.props.all.map((post, key) => {
      return (
        <BlogPost title={post.title} postId={post.id} tags={post.tags} key={key} />
      );
    });

    return (
      <div className="index">
        <Header />
        <h1>Posts</h1>
        {AllPosts}
      </div>
    );
  }
}


const toPropsSendState = (state) => ({ all: state.blog_posts.all });

export default connect(toPropsSendState, { fetchposts })(BlogHome);
