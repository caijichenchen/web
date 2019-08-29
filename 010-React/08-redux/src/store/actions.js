import { Change_item,Change_add,Change_del,Change_axios } from './actionTypes.js';
import axios from 'axios';

export const ActionItem = (task)=>({
	type:Change_item,
	payload:task
})
export const ActionAdd = ()=>({
	type:Change_add
})
export const ActionDel = (index)=>({
	type:Change_del,
	payload:index
})
const ActionNew = (data)=>({
	type:Change_axios,
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