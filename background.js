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
    // if (info.menuItemId === 'remove_element') {
    //     chrome.scripting.executeScript({
    //         target: { tabId: tab.id },
    //         func: removeElement,
    //     });
    // }

    // Background Scirptからはコンテストメニュー表示元の要素を直接取得できないため、
    // Message通知機能を使って、Content Scirpt側にメッセージを送信する
    chrome.tabs.sendMessage(tab.id, "getClickedEl", (response) => {
        // Content Scirpt側で設定されたレスポンス（クリックされた要素）が
        // コールバック関数の引数でやってくる
        console.log(response.value);
    });
});

const removeElement = () => {
    chrome.tabs.sendMessage(tab.id, "getClickedEl", response => {
        // response.value.remove();
        console.log('response', response.value);
    });
}