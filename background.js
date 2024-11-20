chrome.runtime.onInstalled.addListener(() => {
    // コンテキストメニューを作成
    chrome.contextMenus.create({
        id: "remove_element",
        title: "広告を削除する",
        contexts: ["all"]
    });
    // ストレージの初期状態を設定
    chrome.storage.sync.set({extensionEnabled: true}, () => {
        console.log("Extension is enabled by default");
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    // コンテキストメニューがクリックされた時
    chrome.storage.sync.get('extensionEnabled', (data) => {
        if (data.extensionEnabled && info.menuItemId === 'remove_element') {
            chrome.tabs.sendMessage(tab.id, {action: "removeElement"});
        }
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggleExtension") {
        if (request.enabled) {
            console.log("Extension", request.enabled);
            // ここに広告を削除するロジックを追加
        } else {
            console.log("Extension", request.enabled);
            // ここに広告削除を停止するロジックを追加
        }
        // 状態の変更を確認
        chrome.storage.sync.set({extensionEnabled: request.enabled});
    }
});