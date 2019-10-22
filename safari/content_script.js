function handleContextMenu(event) {
	/*var selected = window.getSelection().toString();
	console.log('selected: ' + selected);
	if (selected.match(/[0-9a-fA-F]{20}/)) {
		safari.self.tab.setContextMenuEventUserInfo(event, selected);
	} else {
		safari.self.tab.setContextMenuEventUserInfo(event, '');
	}*/

	var elem = event.target;
	if (elem.tagName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'img') {
		var image_url = elem.getAttribute("src");
		safari.self.tab.setContextMenuEventUserInfo(event, image_url);
	} else {
		safari.self.tab.setContextMenuEventUserInfo(event, '');
	}

}

self.addEventListener("contextmenu", handleContextMenu, false);