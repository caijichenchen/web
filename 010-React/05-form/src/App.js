import React,{ Component,Fragment } from 'react';

class App extends Component{
	render(){
		return (
			<form>
				用户名:<input type="text"/><br/>
				<input onChange={this.handleChange} ref={(input)=>{this.input=input}} />
				密码:<input type="password"/><br/>
				<button>提交</button>
			</form>
		)
	}
}

export default App