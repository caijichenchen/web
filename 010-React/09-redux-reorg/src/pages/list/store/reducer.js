import * as types from './actionTypes.js';
import { fromJS } from 'immutable'

const defaultState = {
	list:[],
	task:''
}

export default (state=defaultState,action)=>{
	// console.log(state);
	if(action.type == types.Change_item){
		// state.task = action.payload;
		const newState = JSON.parse(JSON.stringify(state));
		newState.task = action.payload;
		return newState
	}
	else if(action.type == types.Change_add){
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(state.task);
		newState.task = '';
		return newState
	}
	else if(action.type == types.Change_del){
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);
		return newState
	}
	else if(action.type == types.Change_axios){
		const newState = JSON.parse(JSON.stringify(state));
		newState.list = action.payload;
		return newState
	}
	return state
}