import {VIEW_CHANGE} from './Constants';

const initialState = true;
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_CHANGE:
      return (!state);
    default:
      return state;
  }
};
