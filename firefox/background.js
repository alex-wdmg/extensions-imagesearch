(function(){

   console.log("Plugin loaded!");

   if (typeof console == 'undefined' || !(console || {}).log || !(console || {}).info){
      this.console = {
         dummy: true,
         log:function(){},
         info:function(){},
         error:function(){}
      };
   }

   var services = ["google", "yandex", "tineye", "bing", "iqdb"];
   
   const searchURLs = {
      google: 'https://www.google.com/searchbyimage?image_url=', // Google Image Search
      yandex: 'http://yandex.ru/images/search?rpt=imageview&img_url=', // Yandex Image Search
      bing: 'https://www.bing.com/images/searchbyimage?cbir=sbi&imgurl=', // Bing Image Search
      iqdb: 'https://iqdb.org/?url=', // IQDB Image Search
      tineye: 'http://www.tineye.com/search?url=', // Tineye Image Search
   };

   function onCreated() {
     if (browser.runtime.lastError) {
       console.log("error creating item:" + browser.runtime.lastError);
     } else {
       console.log("item created successfully");
     }
   }

   function removeContextMenus() {
      services.forEach(function(item, i, arr) {
         browser.contextMenus.remove(item);
      });

      /*if (browser.contextMenus)
         browser.contextMenus.update();*/
return;
   }

   function handleMessage(request, sender, sendResponse) {

      console.log('handleMessage: ' + request.url);

      if (request) {
         if (request.url.length > 0) {
            browser.contextMenus.create({
               id: "google",
               title: "Search image by Google",
               contexts: ["all"]
            }, onCreated);
            browser.contextMenus.create({
               id: "yandex",
               title: "Search image by Yandex",
               contexts: ["all"]
            }, onCreated);
            browser.contextMenus.create({
               id: "tineye",
               title: "Search image by Tineye",
               contexts: ["all"]
            }, onCreated);
            browser.contextMenus.create({
               id: "bing",
               title: "Search image by Bing",
               contexts: ["all"]
            }, onCreated);
            browser.contextMenus.create({
               id: "iqdb",
               title: "Search image by IQDB",
               contexts: ["all"]
            }, onCreated);

            browser.contextMenus.update();

         } else {
            removeContextMenus();
            return;
         }
      } else {
         removeContextMenus();
         return;
      }
      //sendResponse({url: request.url});
      //return Promise.resolve({url: request.url});

      setTimeout(() => {
         sendResponse({url: request.url});
      }, 100);  
      return true;

   }

   browser.runtime.onMessage.addListener(handleMessage);

   function createNewTab(url) {
      var creating = browser.tabs.create({
         url: url
      });
      creating.then(onCreated);
   }

   browser.contextMenus.onClicked.addListener((info, tab) => {
      console.log(info);

      if (info.srcUrl) {
         var image_url = info.srcUrl;
         console.log('info.srcUrl: ' + image_url);
         
         switch(info.menuItemId) {
            case 'google': {
               createNewTab(searchURLs.google + encodeURIComponent(image_url));
               break;
            };
            case 'yandex': {
               createNewTab(searchURLs.yandex + encodeURIComponent(image_url));
               break;
            };
            case 'tineye': {
               createNewTab(searchURLs.tineye + encodeURIComponent(image_url));
               break;
            };
            case 'bing': {
               createNewTab(searchURLs.bing + encodeURIComponent(image_url));
               break;
            };
            case 'iqdb': {
               createNewTab(searchURLs.iqdb + encodeURIComponent(image_url));
               break;
            };
            default: {
               break;
            }
         }
      }
   });

})();