let clickedEl = null;

// 右クリックで選択した要素を保存
document.addEventListener("contextmenu", (event) => {
    clickedEl = event.target;
}, true);

// メッセージを受け取り、保存された要素を返す
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "removeElement" && clickedEl) {
        clickedEl.remove();
        clickedEl = null;
    }
});
