import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

import TodoList from './pages/list';

class Home extends Component{
	render(){
		return(<h2>hah</h2>)
	}
}

class User extends Component {
	render(){
		return (<h2>here is { this.props.match.params.id }</h2>)
	}
}

class Admin extends Component {
	render(){
		return  <Switch>
					<Route path="/admin" exact render={()=><h2>hhhhh</h2>}></Route>
					<Route path="/admin/222" render={()=><h2>sssss</h2>}></Route>
					<Route path="/admin/:id" render={(route)=><h2>aaaaa</h2>}></Route>
				</Switch>
	}
}

class App extends Component {
	constructor(props){
		super(props);
	}
    render() {
    	const ProtectedRoute = ({ component: Component, ...rest }) =>{
			console.log(Component)
	        return  <Route
	        			{...rest}
	        			render={()=><Component/>}
			        />
	    }

        return (
            <Router>
	            <div className="App">
	            	<ul>
	            		<li>
			              <Link to="/list">About</Link>
			            </li>
			            <li>
			              <Link to="/User/123">id</Link>
			            </li>
			            <li>
			              <Link to="/admin">admin</Link>
			            </li>
			            <li>
			              <Link to="/admin/111">admin/id</Link>
			            </li>
			            <li>
			              <Link to="/admin/222">admin/222</Link>
			            </li>
	            	</ul>
	            	<Route path="/list" component={TodoList}></Route>
	            	<Route path="/" exact component={Home}></Route>
	            	{/*<Route path="/admin" component={Admin}></Route>*/}
	            	<ProtectedRoute path="/admin" component={Admin}/>
	            	<Route path="/User/:id" component={User}></Route>
            	</div>
            </Router>
        )          
    }
}

export default App