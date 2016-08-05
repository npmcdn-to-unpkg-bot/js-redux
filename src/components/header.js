import React from 'react';
import { Link } from 'react-router';

// header with logo used to add a new post
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

const Header = () => {
  return (
    <div id="text-input">
      <img src={'./../../images/sa4_logo.png'} alt="boohoo" className="img-responsive" />
      <Link id="new-post-link" to="posts/new"><div id="new-post-div">New Post</div></Link>
    </div>
  );
};

export default Header;
