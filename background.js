chrome.runtime.onInstalled.addListener(() => {
    /* コンテキストメニューを作成 */
    const parent = chrome.contextMenus.create({
        id: "remove_element",
        title: "広告を削除する",
        contexts: ["all"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'remove_element') {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: removeElement,
        });
    }
});

const removeElement = () => {
    chrome.tabs.sendMessage(tab.id, "getClickedEl", response => {
        response.value.remove();
    });
}