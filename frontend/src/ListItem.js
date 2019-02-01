/* global chrome */
import React, { Component } from 'react';
class ListItem extends Component{
	constructor(props){
    super(props);
	this.state={value:props.value};
	this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		chrome.identity.getProfileUserInfo(function(info) {
			var  email = info.email;
			console.log('email: ',email);
			var xhr2 = new XMLHttpRequest();
		    xhr2.open("POST", "http://34.204.12.200:5000/delete_page", true);
		    xhr2.onreadystatechange = function(e){
		    	if(xhr2.readyState===4 && xhr2.status===200){
		    		window.location.reload();
		    	}
		    }
		    var params = {'email': email, 'url': this.state.value.url};
	        xhr2.send(JSON.stringify(params));
        });

	}
	render(){
	// return <li>{this.state.value.url}</li>;
	return <div>
	<li>
		{this.state.value.title}<br/>
		{this.state.value.brand}<br/>
		<img src={this.state.value.img} alt={this.state.value.title} height="350" width="250"/><br/>
		<a href={this.state.value.url} target="_blank">{this.state.value.src}</a><br/>
		{this.state.value.price}

		
	</li>
	<button onClick={this.handleClick}>untrack this item</button>
	
	</div>
	}
}
export default ListItem;

