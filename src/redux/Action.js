import {VIEW_CHANGE} from './Constants';
import {FETCH_LABEL} from './Constants';

export const viewChange = () => {
  return {type: VIEW_CHANGE};
};

export const fetchingLabels = data => {
  return {type: FETCH_LABEL, data: data};
};
