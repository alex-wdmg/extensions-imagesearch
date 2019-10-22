(function(){
   function handleResponse(response) {
      console.log(`background script sent a response: ${response.url}`);
      console.log(chrome.menus);
   }

   function handleError(error) {
      console.log(`Handle response error: ${error}`);
      console.log(chrome.menus);
   }

   function handleContextMenu(event) {
      var elem = event.target;

      if (elem.tagName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'img') {
         var image_url = elem.getAttribute("src");
         console.log('handleContextMenu: ' + image_url);
         var sending = chrome.runtime.sendMessage({url: image_url});
         sending.then(handleResponse, handleError);
      } else if (elem.tagName.toLowerCase() == 'a' || elem.nodeName.toLowerCase() == 'a') {
         var pattern = new RegExp("(https?:\/\/.*\.(?:jpg|jpeg|gif|bmp|tiff|webm|png|apng))", "i");
         var image_url = elem.getAttribute("href");
         if (image_url.match(pattern)) {
            console.log('handleContextMenu: ' + image_url);
            var sending = chrome.runtime.sendMessage({url: image_url});
            sending.then(handleResponse, handleError);
         } else {
            var sending = chrome.runtime.sendMessage({url: ''});
            console.log('handleContextMenu: ');
            sending.then(handleResponse, handleError);
         }
      } else {
         var sending = chrome.runtime.sendMessage({url: ''});
         console.log('handleContextMenu: ');
         sending.then(handleResponse, handleError);
      }
   }

   self.addEventListener("contextmenu", handleContextMenu, false);

})();