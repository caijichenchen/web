import { combineReducers } from 'redux';
// import { combineReducers } from 'redux-immutable';
import { reducer as todolistReducer } from '../pages/list/store';

export default combineReducers({
    todolist:todolistReducer
})