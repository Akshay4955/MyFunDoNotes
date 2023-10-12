import {CHANGE_LANGUAGE} from './Constants';

const initialState = 'ENGLISH';
export const LanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return action.value;
    default:
      return state;
  }
};
