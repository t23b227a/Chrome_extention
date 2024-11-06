document.addEventListener("contextmenu", event => {
    // イベント発生時の要素を保存
    clickedEl = event.target;
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // 保存しておいた要素情報をレスポンスに設定して返却
    if(request == "getClickedEl") {
        sendResponse({value: clickedEl.outerHTML});
    }
});