document.addEventListener('DOMContentLoaded', function() {
  chrome.identity.getProfileUserInfo(function(info) {
    email = info.email;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://tongspricetracker.com/get_all_tracked", true);
    //reload once
    window.onload = function() {
        if(!window.location.hash) {
          window.location = window.location + '#loaded';
          window.location.reload();
        }
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) {
        
        return;
      }

      // JSON.parse does not evaluate the attacker's scripts.
      if (xhr.readyState == 4) {
        // location.reload();
        urls = JSON.parse(xhr.responseText);
        if (urls === undefined || urls.length == 0) {
          $("body").append("<h2>You are not tracking any pages.<h2/> <br/>");
          return;
        }

        $("body").append("<h2>You are tracking these pages:<h2/>");
        console.log(urls);
        for(var key in urls) {
          url = urls[key]['url'];
          price = urls[key]['price'];
          console.log(price);
          $("body").append("<button id='" + key + "' type='button'>Untrack</button>&nbsp;&nbsp;")
          $("body").append("<a href='" + url + "'>" + url + "<a/>&nbsp; " +
            (price == null ? "Price not available" : "$" + price) + "<br/>");
          $("#" + key).click(function(){
            var xhr2 = new XMLHttpRequest();
            xhr2.open("POST", "https://tongspricetracker.com/delete_page", true);
            xhr2.onreadystatechange = function() {
              if (xhr2.readyState == 4) {
                // JSON.parse does not evaluate the attacker's scripts.
                console.log(xhr2.responseText);
                location.reload();
              }
            }
            var params = {'email': email, 'url': url};
            xhr2.send(JSON.stringify(params))
          });
        }
      } 
    }
    var params = {'email': email};
    xhr.send(JSON.stringify(params))
  });
});
