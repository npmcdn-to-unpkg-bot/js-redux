import axios from 'axios';
import { browserHistory } from 'react-router';

// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=jakerber';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
};

// all actions functions here were adapted from http://cs52.me/assignments/hw4/
// functions to add, delete, update, and get blog posts.

// fetch all posts and add data to payload
export function fetchposts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: { postsAll: response.data },
      });
    }).catch(error => {
      console.log(error);
    });
  };
}

// fetch a single post through it's id and add data to payload
export function fetchpost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      dispatch({
        type: ActionTypes.FETCH_POST,
        payload: { postSingle: response.data },
      });
      console.log('fetch success');
    }).catch(error => {
      console.log(error);
    });
  };
}

// create a single post with title, content, and tags passed in within the post object parameter
// no payload necessary
export function createpost(post) {
  return (dispatch) => {
    const data = {
      title: post.title,
      content: post.content,
      tags: post.tags,
    };
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, data).then(response => {
      browserHistory.push('/');
      dispatch({
        type: ActionTypes.CREATE_POST,
        payload: null,
      });
      console.log('create success');
    }).catch(error => {
      console.log(error);
    });
  };
}


// update a specific post throgh it's id and data passed in through the post object parameter
// no payload necessary
export function updatepost(post, id) {
  return (dispatch) => {
    const data = {
      title: post.title,
      content: post.content,
      tags: post.tags,
    };
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, data).then(response => {
      dispatch({
        type: ActionTypes.UPDATE_POST,
        payload: null,
      });
      console.log('update success');
      location.reload();
    }).catch(error => {
      console.log(error);
    });
  };
}


// delete a specific post from its id
// no payload necessary
export function deletepost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      browserHistory.push('/');
      dispatch({
        type: ActionTypes.DELETE_POST,
        payload: null,
      });
      console.log('delete success');
    }).catch(error => {
      console.log(error);
    });
  };
}
