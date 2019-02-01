/* global chrome */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Album from './App';
// import App from './App2';
import registerServiceWorker from './registerServiceWorker';

// function unfav(){
//   console.log('function');


// } 

var arr;
const cards_arr = [];
var email = 'tongxiong99@gmail.com';
// var email= chrome.info.email;
var xhr = new XMLHttpRequest();
xhr.open("POST", "https://34.204.12.200:5000/get_all_tracked", true);
console.log("test1");
xhr.onreadystatechange = function(e){
  if(xhr.readyState===4 && xhr.status===200){

    
    console.log('result: ', JSON.parse(this.response));
    arr = JSON.parse(this.response);
    var i;
    for (i = 0; i < arr.length; i++){
      cards_arr.push({
        src: arr[i]['src'],
        img: arr[i]['img'],
        title: arr[i]['title'],
        url: arr[i]['url'],
        brand: arr[i]['brand'],
        price: arr[i]['price']
      });
    }
    console.log('cards_arr:',cards_arr);
    ReactDOM.render(<Album  myarr={cards_arr.slice()} />, document.getElementById('root'));
    // console.log('myarr:',myarr);
  }
}
// ReactDOM.render(<Album arr={cards_arr}/>, document.getElementById('root'));
var params = {'email': email};
xhr.send(JSON.stringify(params));


// ReactDOM.render(<Album arr={cards_arr}/>, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
