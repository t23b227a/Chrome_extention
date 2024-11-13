let clickedEl;

document.addEventListener("contextmenu", (event) => {
    // イベント発生時の要素を保存
    clickedEl = event.target;
    console.log('保存された要素: ', clickedEl);
}, true);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('receive Message: ', request);
    if (request == "getClickedEl") {
        sendResponse({ value: clickedEl });
    }
});