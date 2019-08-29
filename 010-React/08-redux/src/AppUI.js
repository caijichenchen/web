import "./App.css";
import React, { Component } from 'react';

import { Button, Input, Row, Col, List } from 'antd';

const AppUI = (props)=>{
	// console.log(props);
	const { handleChange,task,handleClick,list,handleDel } = props;
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

export default AppUI