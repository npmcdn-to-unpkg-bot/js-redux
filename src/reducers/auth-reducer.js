import { ActionTypes } from '../actions';

// credit to Tim Tregubov and the cs52 hw5 part 2 walkthrough
// hosted at http://cs52.me/assignments/hw5p2/
// authentication reducer for blog users

const ReducerAuth = (state = { authenticated: false }, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return {
        authenticated: true,
      };
    case ActionTypes.AUTH_ERROR:
      return {
        authenticated: false,
      };
    case ActionTypes.DEAUTH_USER:
      return {
        authenticated: false,
      };
    default:
      return state;
  }
};

export default ReducerAuth;
