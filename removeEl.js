let clickedEl;

document.addEventListener("contextmenu", event => {
    // イベント発生時の要素を保存
    clickedEl = event.target;
    console.log('save clickedEl: ', clickedEl);
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('receive Message: ', request);
    // 保存しておいた要素情報をレスポンスに設定して返却
    if(request == "getClickedEl") {
        sendResponse({value: clickedEl.outerHTML});
    }
});