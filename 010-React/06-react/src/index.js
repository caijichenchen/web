import React from 'react';
import ReactDOM from 'react-dom';

function rick(){
	const time = (<p>{ new Date().toLocaleTimeString() }</p>)

	ReactDOM.render(time,document.getElementById('box'));
}

rick();
setInterval(rick,1000)