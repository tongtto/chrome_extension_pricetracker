/* global chrome */

var enable = new Boolean(true);
/*
if( document.location.host.includes("net-a-porter")||
    document.location.host.includes("shopbop")||
    document.location.host.includes("saksfifthavenue")||
    document.location.host.includes("yoox")||
    (document.location.host.includes("revolve")) && (document.location.href.includes("?d=Womens")||document.location.href.includes("?d=Mens"))){
    enable = true;
}
*/
var logged_in_user = null;
chrome.extension.sendRequest({}, function(response) {
    // alert(response.email);
    logged_in_user = response.email
    chrome.runtime.sendMessage({

        ifenable: enable, 
        method: 'POST',
        action: 'xhttp',
        url: 'https://tongspricetracker.com/check_if_tracked',
        data:
                {email : logged_in_user,
                url : document.location.href}
        
    },function(responseText){

    });
});
