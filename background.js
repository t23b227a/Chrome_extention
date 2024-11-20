chrome.runtime.onInstalled.addListener(() => {
    // コンテキストメニューを作成
    chrome.contextMenus.create({
        id: "remove_element",
        title: "広告を削除する",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    // コンテキストメニューがクリックされた時
    if (info.menuItemId === 'remove_element') {
        console.log('tabId', tab.id);  // タブのIDを確認
        chrome.tabs.sendMessage(tab.id, {action: "removeElement"});
    }
});