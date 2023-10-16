import {CHANGE_THEME, VIEW_CHANGE} from './Constants';
import {FETCH_LABEL} from './Constants';
import {CHANGE_LANGUAGE} from './Constants';

export const viewChange = () => {
  return {type: VIEW_CHANGE};
};

export const fetchingLabels = data => {
  return {type: FETCH_LABEL, data: data};
};

export const changeLanguage = value => {
  return {type: CHANGE_LANGUAGE, value: value};
};

export const changeTheme = value => {
  return {type: CHANGE_THEME, value};
};
