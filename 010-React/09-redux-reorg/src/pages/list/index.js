import React,{ Component,Fragment } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { Button, Input, Row, Col, List } from 'antd';
import { actions } from './store';

class App extends Component{
    componentDidMount(){
        this.props.handleInit()
    }
    render(){
    	const { handleChange,task,handleClick,list,handleDel } = this.props;
		return (
	            <div className="App">
		            <Row>
		                <Col span={18}>
		                    <Input 
		                        onChange={handleChange}
		                        value={task}
		                    />
		                </Col>
		                <Col span={6}>
		                    <Button 
		                        type="primary"
		                        onClick={handleClick}
		                    >
		                        Primary
		                    </Button>
		                </Col>
		            </Row>
		            <List
		              style={{marginTop:10}}
		              bordered
		              dataSource={list}
		              renderItem={(item,index) => (
		                <List.Item
		                    onClick={()=>{handleDel(index)}}
		                >
		                   {item}
		                </List.Item>
		              )}
		            /> 
		        </div>
	        )
    }
	
}

const mapStateToProps = (state)=>{
    return {
      task:state.todolist.task,
      list:state.todolist.list  
    }    
}

//映射方法到组件
const mapDispatchToProps = (dispatch)=>({
    handleChange:(ev)=>{
        const task = ev.target.value
        dispatch(actions.ActionItem(task))
    },
    handleClick:()=>{
        dispatch(actions.ActionAdd())
    },
    handleDel:(index)=>{
        dispatch(actions.ActionDel(index))
    },
    handleInit:()=>{
        dispatch(actions.getRequeatData())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(App)//拿到数据返回给组件