var id = -1;
var index = -1;
var _max = -1;
var _min = 0;
var mode = "circulate";

chrome.storage.local.set({
    "mode": mode
});

function swap_stop(direction) {
    if (direction == "right" && index < _max - 1) {
        chrome.tabs.move(id, {
            "index": index + 1
        });
    } else if (direction == "left" && index > _min) {
        chrome.tabs.move(id, {
            "index": index - 1
        });
    } else if (direction == "rightmost") {
        chrome.tabs.move(id, {
            "index": _max - 1
        });
    }
}

function swap_circulate(direction) {
    if (direction == "right") {
        if (index < _max - 1) {
            chrome.tabs.move(id, {
                "index": index + 1
            });
        } else if (index == _max - 1) {
            chrome.tabs.move(id, {
                "index": _min
            });
        }
    } else if (direction == "left") {
        if (index > _min) {
            chrome.tabs.move(id, {
                "index": index - 1
            });
        } else if (index == _min) {
            chrome.tabs.move(id, {
                "index": _max - 1
            });
        }
    } else if (direction == "rightmost") {
        chrome.tabs.move(id, {
            "index": _max - 1
        });
    }
}


chrome.tabs.onActivated.addListener(function(activeInfo) {
    id = activeInfo.tabId;
    chrome.tabs.get(id, function(tab) {
        index = tab.index;
    });
    // Get number of windows.
    chrome.windows.getCurrent(function(window){
        windowId = window.id;
        chrome.tabs.query({"windowId": windowId}, function(tabs) {
            _max = tabs.length;
        });
        chrome.tabs.query({"pinned": true}, function(tabs) {
            _min = tabs.length;
        });
    });
})

chrome.tabs.onMoved.addListener(function() {
    chrome.tabs.get(id, function(tab) {
        index = tab.index;
    });
})

chrome.storage.onChanged.addListener(function(changes) {
    mode = changes['mode'].newValue;
})


chrome.commands.onCommand.addListener(function(command) {
    if (mode == "stop") {
        swap_stop(command);
    } else if (mode == "circulate") {
        swap_circulate(command);
    }
})
