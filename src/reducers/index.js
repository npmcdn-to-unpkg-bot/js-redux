import { combineReducers } from 'redux';

import Reducer from './reducer';

// use reducer 'blog_posts' in app
const rootReducer = combineReducers({
  blog_posts: Reducer,
});

export default rootReducer;
