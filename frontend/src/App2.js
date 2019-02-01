
/* global chrome */
import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import ListItem from './ListItem';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      urls: []
    }

  }

  componentDidMount(){
    console.log("test");
    chrome.identity.getProfileUserInfo(function(info) {
      var email = info.email;
      var xhr = new XMLHttpRequest();
      var self = this; 
      xhr.open("POST", "http://34.204.12.200:5000/get_all_tracked", true);
      console.log("test1");
      xhr.onreadystatechange = function(e){
        console.log("test2");
        if(xhr.readyState===4 && xhr.status===200){
            console.log("test3");
            console.log('result: ', JSON.parse(this.response));
            self.setState(
            {
                urls: JSON.parse(this.response)
            });
        }
  
      }
      console.log("test4");
      var params = {'email': email};
      xhr.send(JSON.stringify(params));
    }.bind(this));
  }

  render() {
    if (this.state.urls === undefined || this.state.urls.length === 0) {
      return (<div>You are not tracking any pages.</div>);
    }
    console.log('urls: ',this.state.urls);

    return (
    <div>
      <h1 className="App-title">price tracker</h1>
      <div id="myhead">You are tracking some pages:</div>
      <div id="mymap">
        <ul>{
          this.state.urls.map(item =>
              
                <ListItem key={item.url.toString()} value={item}/>
              
          )
        }

        </ul>
        
      </div>

    </div>);


    
  }
}

export default App;
