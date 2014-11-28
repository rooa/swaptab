var id = -1;
var index = -1;
var _max = -1;

function swap_stop(direction){
    if (direction == "right" && index < _max - 1){
        chrome.tabs.move(id,{"index":index+1});
    }
    else if (direction == "left" && index > 0){
        chrome.tabs.move(id,{"index":index-1});
    }
}

function swap_circulate(direction){
    if (direction == "right"){
        if (index < _max - 1){
            chrome.tabs.move(id,{"index":index+1});
        }
        else if (index == _max - 1){
            chrome.tabs.move(id,{"index":0});
        }
    }
    else if (direction == "left"){
        if (index > 0){
            chrome.tabs.move(id,{"index":index-1});
        }
        else if (index == 0){
            chrome.tabs.move(id,{"index":_max-1});
        }
    }
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
    id = activeInfo.tabId;
    chrome.tabs.get(id,function(tab){
        index = tab.index;
    });
    chrome.tabs.getAllInWindow(function(array_tab){
        _max = array_tab.length;
    });
})

chrome.tabs.onMoved.addListener(function(){
    chrome.tabs.get(id,function(tab){
        index = tab.index;
    });
})

chrome.commands.onCommand.addListener(function(command) {

    swap_stop(command);
})