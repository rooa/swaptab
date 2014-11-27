var id = -1;
var index = -1;
var max_ = -1;

function swap(direction){
    if (direction == "right" && index < max_ - 1){
        chrome.tabs.move(id,{"index":index+1});
    }
    else if (direction == "left" && index > 0){
        chrome.tabs.move(id,{"index":index-1});
    }
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
    id = activeInfo.tabId;
    chrome.tabs.get(id,function(tab){
        index = tab.index;
    });
    chrome.tabs.getAllInWindow(function(array_tab){
        max_ = array_tab.length;
    });
})

chrome.tabs.onMoved.addListener(function(){
    chrome.tabs.get(id,function(tab){
        index = tab.index;
    });
})

chrome.commands.onCommand.addListener(function(command) {
    swap(command);
})