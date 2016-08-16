import axios from 'axios';
import { browserHistory } from 'react-router';

// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

const ROOT_URL = 'http://hw5p2-backend.herokuapp.com/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

// all actions functions here were adapted from http://cs52.me/assignments/hw4/
// functions to add, delete, update, and get blog posts.

// fetch all posts and add data to payload
export function fetchposts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/`).then(response => {
      dispatch({
        type: ActionTypes.FETCH_POSTS,
        payload: { postsAll: response.data },
      });
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  };
}

// fetch a single post through it's id and add data to payload
export function fetchpost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`).then(response => {
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
    axios.post(`${ROOT_URL}/posts`, data, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
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
    axios.put(`${ROOT_URL}/posts/${id}`, data, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
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
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } }).then(response => {
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

// credit for below to Tim Tregubov and the cs52 hw5 part 2 walkthrough
// hosted at http://cs52.me/assignments/hw5p2/

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

// takes in an object with email and password (minimal user object)
// returns a thunk method that takes dispatch as an argument (just like our create post method really)
export function signinUser({ email, password }) {
  return (dispatch) => {
    // does an axios.post on the /signin endpoint
    console.log(`i have ${email} and ${password}`);
    axios.post(`${ROOT_URL}/signin/`, { email, password }).then(response => {
      // on success does:
      //  dispatch({ type: ActionTypes.AUTH_USER });
      //  localStorage.setItem('token', response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    })
    .catch((error) => {
      // on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

// takes in an object with email and password (minimal user object)
// returns a thunk method that takes dispatch as an argument (just like our create post method really)
export function signupUser({ email, password, username }) {
  return (dispatch) => {
    console.log(`i have ${email}, ${username}, and ${password}`);
    // does an axios.post on the /signup endpoint (only difference from above)
    axios.post(`${ROOT_URL}/signup/`, { email, password, username }).then(response => {
      // on success does:
      //  dispatch({ type: ActionTypes.AUTH_USER });
      //  localStorage.setItem('token', response.data.token);
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    })
    .catch((error) => {
      // on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}
