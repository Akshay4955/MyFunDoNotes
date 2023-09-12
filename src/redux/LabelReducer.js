import {FETCH_LABEL} from './Constants';

const initialState = [];
export const LabelReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LABEL:
      return action.data;
    default:
      return state;
  }
};
