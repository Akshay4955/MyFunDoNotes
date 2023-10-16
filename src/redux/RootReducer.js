import {combineReducers} from 'redux';
import {reducer} from './Reducer';
import {LabelReducer} from './LabelReducer';
import {LanguageReducer} from './LanguageReducer';
import {ThemeReducer} from './ThemeReducer';

export default combineReducers({
  reducer,
  LabelReducer,
  LanguageReducer,
  ThemeReducer,
});
