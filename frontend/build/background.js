var res;
var email_send;
// var n_id;
chrome.identity.getProfileUserInfo(function(info) {
    email_send = info.email; 
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        console.log('email to be sent:',email_send);
        sendResponse({email: email_send});

    });

});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // if (msg.action === "updateIcon") {
        console.log('action received');
        if (msg.ifenable===true) {
        	//tabId: sender.tab.id,
            console.log('enable icon');
            if (msg.action == 'xhttp') {
                console.log(msg.data);
                // console.log('email: ',msg.data["email"]);
                // console.log('url: ',msg.data["url"]);
                var xhr = new XMLHttpRequest();
                var method = msg.method;
                xhr.onload = function() {
                    console.log('responseText from background: ',xhr.responseText);
                    res = xhr.responseText;
                    if (res === 'no'){
                        chrome.browserAction.setIcon({
                            tabId: sender.tab.id,
                            path: {"19":"icon1.png"}
                        });
                    } else {
                        chrome.browserAction.setIcon({
                            tabId: sender.tab.id,
                            path: {"38":"icon2.png"}
                        });
                    }
                };
                xhr.onerror = function() {
                    console.log('error occurs');
                    sendResponse();
                };
                xhr.open(method,msg.url,true);
                xhr.send(JSON.stringify(msg.data));
            }
        } else {
            console.log(sender.tab.id);
            chrome.browserAction.disable(sender.tab.id);
        }
    // }
    return true;
});

// console.log('res: ',res);
// if(res ==='no'){
    chrome.browserAction.onClicked.addListener(function(tab) {
        if(res === 'no') {
            // alert('messeage');
            console.log('press button');
            chrome.identity.getProfileUserInfo(function(info) {
                var email = info.email;
                console.log('email: ',email);
                console.log('info: ', info);
                chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
                    console.log('tabs:', tabs);
                    var url = tabs[0].url;
                    console.log(url); 
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "https://tongspricetracker.com/track_page", true);
                    console.log('readyState before:',xhr.readyState);
                    console.log('status before:',xhr.status);
                    // xhr.onreadystatechange = function(e) {
                    // if (xhr.readyState !==4) {
                    //     var opt1 = {
                    //         type: "basic",
                    //         title: "price tracker",
                    //         message: "tracking this item",
                    //         iconUrl: "sign check.png"
                    //     }
                    //     chrome.notifications.create(opt1);
                    // } else {
                        xhr.onreadystatechange = function(e) {
                        if (xhr.readyState ===4){
                            console.log('responseText1: ',xhr.responseText);
                            if(xhr.responseText === 'success'){
                                var opt2 = {
                                    type: "basic",
                                    title: "price tracker",
                                    message: "track this item successfully!",
                                    iconUrl: "sign check.png"
                                }
                                console.log('readyState:',xhr.readyState);
                                console.log('status:',xhr.status);
                                // console.log(n_id);
                                chrome.notifications.create(opt2);
                                chrome.browserAction.setIcon({
                                    tabId: tab.id,
                                    path: {"38":"icon2.png"}
                                });
                                res = 'yes';
                            }
                        }
                    }    
                    var params = {'email': email, 'url': url};
                    xhr.send(JSON.stringify(params));
                    
                });
            });

        } else {
            alert('Oops! you already tracked this item');
        }
    });
// }


