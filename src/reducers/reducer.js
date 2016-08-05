import { ActionTypes } from '../actions';

// app reducer
// credit to Tim Tregubov and the cs52 hw4 walkthrough
// hosted at http://cs52.me/assignments/hw4/

// update app state
// if all posts were fetched -- 'FETCH_POSTS': add all posts from payload to all, no post update necessary
// if one post was fetched -- 'FETCH_POST': add empty array to all, add post recieved from payload to post
const Reducer = (state = { all: [], post: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { all: action.payload.postsAll, post: null };
    case ActionTypes.FETCH_POST:
      return { all: [], post: action.payload.postSingle };
    default:
      return state;
  }
};

export default Reducer;
