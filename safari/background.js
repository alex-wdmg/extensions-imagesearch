(function(){

	if (typeof console == 'undefined' || !(console || {}).log || !(console || {}).info){
		this.console = {
			dummy: true,
			log:function(){},
			info:function(){},
			error:function(){}
		};
	}

	const searchURLs = {
		google: 'https://www.google.com/searchbyimage?image_url=', // Google Image Search
		yandex: 'http://yandex.ru/images/search?rpt=imageview&img_url=', // Yandex Image Search
		bing: 'https://www.bing.com/images/searchbyimage?cbir=sbi&imgurl=', // Bing Image Search
		iqdb: 'https://iqdb.org/?url=', // IQDB Image Search
		tineye: 'http://www.tineye.com/search?url=', // Tineye Image Search
	};

	const services = new Array("google", "yandex", "tineye", "bing", "iqdb");

	function getSearchUrl(mode, image_url) {
		switch(mode) {
			case 'google': {
				return searchURLs.google + image_url;
			};
			case 'yandex': {
				return searchURLs.yandex + image_url;
			};
			case 'tineye': {
				return searchURLs.tineye + image_url;
			};
			case 'bing': {
				return searchURLs.bing + image_url;
			};
			case 'iqdb': {
				return searchURLs.iqdb + image_url;
			};
			default: {
				break;
			}
		}
	}

	function handleCommand(event) {
		if (services.indexOf(event.command) != -1) {
			//var tab = safari.application.activeBrowserWindow.activeTab;
			var tab = safari.application.activeBrowserWindow.openTab();
			tab.url = getSearchUrl(event.command, event.userInfo);
		}
	}

	function handleContextMenu(event) {
		if (event.userInfo) {
			if (event.userInfo.length > 0) {
				event.contextMenu.appendContextMenuItem("google", "Search image by Google");
				event.contextMenu.appendContextMenuItem("yandex", "Search image by Yandex");
				event.contextMenu.appendContextMenuItem("tineye", "Search image by Tineye");
				event.contextMenu.appendContextMenuItem("bing", "Search image by Bing");
				event.contextMenu.appendContextMenuItem("iqdb", "Search image by IQDB");
			}
		}
	}

	safari.application.addEventListener("command", handleCommand, false);
	safari.application.addEventListener("contextmenu", handleContextMenu, false);

})();