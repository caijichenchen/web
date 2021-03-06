import React,{ Component,Fragment } from 'react';
import "./App.css";
import store from './store';
import Item from "./Items.js";

class App extends Component{
	constructor(props){
		super(props);
		/*
		this.state = {
			list:["吃饭","睡觉","写代码","跑步"],
			task:''
		},
		*/
		this.state = store.getState();
		//更新数据
		store.subscribe(this.setState(()=>{
			this.state = store.getState();
		}));
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this)
	}
	handleClick(){
		this.setState((PreState)=>({
			//PreState代表上一个状态信息
			list:[...PreState.list,PreState.task],
			task:""
		}))
	}
	handleChange(ev){
		const task = ev.target.value;
		/*
		this.setState(()=>({
			task:task
		}))
		*/
		//action是一个对象
		const action = {
			type:"change_item",
			payload:task
		}
		//传递变化数据给store
		store.dispatch(action)
	}
	handleDel(index){
		const list = [...this.state.list];
		list.splice(index,1);
		this.setState(()=>({
			list:list
		}))
	}
	getItemData(){
		return this.state.list.map((item,index)=>{
					// return  (<li 
					// key={index}
					// onClick={this.handleDel.bind(this,index)}
					// >{item}</li>) 
					return <Item key={index} task={item} handleDel={this.handleDel.bind(this,index)}/>
				})
	}
	render(){
		return (
			<div className="App">
				{
					//react
				}
				<input onChange={this.handleChange} value={this.state.task} />
				<button className="btn" onClick={this.handleClick}>提交</button>
				<ul style={{ color:'red' }}>
					{
						/*this.state.list.map((item,index)=>{
							// return  (<li 
							// key={index}
							// onClick={this.handleDel.bind(this,index)}
							// >{item}</li>) 
							return <Item key={index} task={item} handleDel={this.handleDel.bind(this,index)}/>
						})*/
						this.getItemData()
					}
				</ul>
			</div>
		)
	}
}

export default App