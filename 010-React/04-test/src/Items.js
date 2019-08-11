import React,{ Component } from 'react';
import PropTypes from 'prop-types';

class Item extends Component{
	constructor(props){
		super(props)
	}
	render(){
		// console.log(this.props);
		const { handleDel,task } = this.props;
		return (
			<li onClick={handleDel}>{task}</li>
		)
	}
}
Item.propTypes={
	handleDel:PropTypes.func,
	task:PropTypes.string.isRequired
}
Item.defaultProps = {
    task:'Hello'
}
export default Item