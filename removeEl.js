let clickedEl;

document.addEventListener("contextmenu", (event) => {
    // イベント発生時の要素を保存
    clickedEl = event.target;
    console.log('save clickedEl: ', clickedEl);
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('receive Message: ', request);
    if(request === "getClickedEl") {
        if (clickedEl) {
            clickedEl.remove();
            sendResponse({ value: '要素を削除しました'});
        } else {
            sendResponse({ value: '要素が存在しませんでした'});
        }
    }
});