import { combineReducers } from 'redux';
import counter from './counter';
import reducer from "../ducks";

const rootReducer = combineReducers({
  counter,
  reducer
});

export default rootReducer;
