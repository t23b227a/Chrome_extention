chrome.runtime.onInstalled.addListener(() => {
    console.log('set contextMenus.');
    /* コンテキストメニューを作成 */
    const parent = chrome.contextMenus.create({
        type: "normal",
        id: "remove_element",
        title: "広告を削除する",
        contexts: ["all"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    console.log('test');
    console.log('info.menuItemId', info.menuItemId);
    console.log('tabId', tab.Id);
    if (info.menuItemId === 'remove_element') {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: removeElement,
        });
    }
});

const removeElement = () => {
    chrome.tabs.sendMessage(tab.id, "getClickedEl", response => {
        console.log('response', response.value);
        response.value.remove();
    });
}