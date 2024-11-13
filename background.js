chrome.runtime.onInstalled.addListener(() => {
    /* コンテキストメニューを作成 */
    const parent = chrome.contextMenus.create({
        type: "normal",
        id: "remove_element",
        title: "広告を削除する",
        contexts: ["all"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'remove_element') {
        console.log('tabId', tab.id);
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                chrome.tabs.sendMessage(tab.id, "getClickedEl", (response) => {
                    if (response && response.value) {
                        console.log('削除対象: ', response.value);
                        response.value.remove();
                    } else {
                        console.log('削除する要素が見つかりませんでした');
                    }
                });
            }
        });
    }
});