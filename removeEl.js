let clickedEl = null;

// 右クリックで選択した要素を保存
document.addEventListener("contextmenu", event => {
    clickedEl = event.target;
    console.log('save clickedEl: ', clickedEl);  // 右クリックされた要素を保存
}, true);

// メッセージを受け取り、保存された要素を返す
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('receive Message: ', request);  // メッセージを確認

    if (request === "getClickedEl") {
        // 右クリックした要素があればそのouterHTMLを返す
        if (clickedEl) {
            console.log('clickedEl outerHTML: ', clickedEl.outerHTML);
            sendResponse({ value: clickedEl.outerHTML });
        } else {
            sendResponse({ value: null });
        }
    }
});
