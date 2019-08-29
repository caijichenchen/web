import * as types from './actionTypes.js';
import axios from 'axios';

export const ActionItem = (task)=>({
	type:types.Change_item,
	payload:task
})
export const ActionAdd = ()=>({
	type:types.Change_add
})
export const ActionDel = (index)=>({
	type:types.Change_del,
	payload:index
})
const ActionNew = (data)=>({
	type:types.Change_axios,
	payload:data
})
export const getRequeatData = ()=>{
	return (dispatch,getState)=>{
        axios.get('http://127.0.0.1:3000')
        .then(result=>{
            dispatch(ActionNew(result.data))
        })
        .catch(err=>{
            console.log(err)
        })        
    }
}