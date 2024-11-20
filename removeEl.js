let clickedEl = null;

// 右クリックで選択した要素を保存
document.addEventListener("contextmenu", (event) => {
    clickedEl = event.target;
    console.log('save clickedEl: ', clickedEl);  // 右クリックされた要素を保存
}, true);

// メッセージを受け取り、保存された要素を返す
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('receive Message: ', message);  // メッセージを確認
    
    if (message.action === "removeElement" && clickedEl) {
        console.log('remove Element:', clickedEl);
        clickedEl.remove();
        clickedEl = null;
        console.log('removed Element:', clickedEl);
    }
});
