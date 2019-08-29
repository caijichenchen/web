import React,{ Component,Fragment } from 'react';
import AppUI from './AppUI.js';
import { connect } from 'react-redux';
import { Button, Input, Row, Col, List } from 'antd';
import { ActionItem,ActionAdd,ActionDel,ActionNew,getRequeatData } from './store/actions.js';

class App extends Component{
	/*
	constructor(props){
		super(props);
		this.state = store.getState();
		//更新数据
		store.subscribe(()=>{
			this.setState(store.getState())
		})
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDel = this.handleDel.bind(this)
	}
	handleClick(){
		//传递变化数据给store
		store.dispatch(ActionAdd())
	}
	handleChange(ev){
		const task = ev.target.value;
		//传递变化数据给store
		store.dispatch(ActionItem(task))
	}
	handleDel(index){
		//传递变化数据给store
		store.dispatch(ActionDel(index))
	}
	componentDidMount(){
        //发送ajax请求
        /*
        axios.get('http://127.0.0.1:3000')
        .then(result=>{
            // console.log(result)
			store.dispatch(ActionNew(result.data))
        })
        .catch(err=>{
            console.log(err)
        })
        
        store.dispatch(getRequeatData());
    }
    */
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
      task:state.task,
      list:state.list  
    }    
}

//映射方法到组件
const mapDispatchToProps = (dispatch)=>({
    handleChange:(ev)=>{
        const task = ev.target.value
        dispatch(ActionItem(task))
    },
    handleClick:()=>{
        dispatch(ActionAdd())
    },
    handleDel:(index)=>{
        dispatch(ActionDel(index))
    },
    handleInit:()=>{
        dispatch(getRequeatData())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(App)//拿到数据返回给组件