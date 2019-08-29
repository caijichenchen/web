import { Change_item,Change_add,Change_del,Change_axios } from './actionTypes.js';

const defaultState = {
	list:[],
	task:''
}
/*	
	reducer主要用来处理传递参数(纯函数固定输入固定输出)
	reducer是一个新的state对象,不能更改参数中传递过来的state,
	原因是因为传递过来的state是store中的state,所有组件中都共享的state,
	这个state由store维护,store中的state是由reducer传递来的state更改自己的state,
*/

export default (state=defaultState,action)=>{
	// console.log(state);
	if(action.type == Change_item){
		// state.task = action.payload;
		const newState = JSON.parse(JSON.stringify(state));
		newState.task = action.payload;
		return newState
	}
	else if(action.type == Change_add){
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.push(state.task);
		newState.task = '';
		return newState
	}
	else if(action.type == Change_del){
		const newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);
		return newState
	}
	else if(action.type == Change_axios){
		const newState = JSON.parse(JSON.stringify(state));
		newState.list = action.payload;
		return newState
	}
	return state
}