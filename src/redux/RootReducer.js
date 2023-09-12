import {combineReducers} from 'redux';
import {reducer} from './Reducer';
import {LabelReducer} from './LabelReducer';

export default combineReducers({
  reducer,
  LabelReducer,
});
