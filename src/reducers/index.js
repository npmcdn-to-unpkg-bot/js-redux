import { combineReducers } from 'redux';

import Reducer from './reducer';
import ReducerAuth from './auth-reducer';

// use reducer 'blog_posts' in app // now includes reducer for blog authentication
const rootReducer = combineReducers({
  blog_posts: Reducer,
  auth: ReducerAuth,
});

export default rootReducer;
