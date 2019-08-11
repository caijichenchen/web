import React,{ Component,Fragment } from 'react';
import "./App.css";
import Item from "./Items.js";

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			list:["吃饭","睡觉","写代码","跑步"],
			task:''
		},
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this)
	}
	handleClick(){
		// console.log(this);
		// console.log(this+"click");
		// console.log(this.state);
		this.setState((PreState)=>({
			//PreState代表上一个状态信息
			list:[...PreState.list,PreState.task],
			task:""
		}))
		// console.log(this.state);
	}
	handleChange(ev){
		// console.log(ev.target.value);
		// const task = ev.target.value;
		console.log(this.input);
		const task = this.input.value;
		console.log(task);
		this.setState(()=>({
			task:task
		}))
		// this.setState({
		// 	task:ev.target.value
		// })
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
				<input onChange={this.handleChange} ref={(input)=>{this.input=input}} />
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