import {CHANGE_THEME} from './Constants';

const initialState = 'DARK';
export const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.value;
    default:
      return state;
  }
};
