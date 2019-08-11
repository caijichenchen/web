import React,{ Component } from 'react';

class Item extends Component{
	render(){
		return (
			<li>{this.props.task}</li>
		)
	}
}

export default Item