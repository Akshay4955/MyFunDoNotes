import {combineReducers} from 'redux';
import {reducer} from './Reducer';
import {LabelReducer} from './LabelReducer';
import {LanguageReducer} from './LanguageReducer';

export default combineReducers({
  reducer,
  LabelReducer,
  LanguageReducer,
});
