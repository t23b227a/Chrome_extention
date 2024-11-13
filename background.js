chrome.runtime.onInstalled.addListener(() => {
    // コンテキストメニューを作成
    const parent = chrome.contextMenus.create({
        type: "normal",
        id: "remove_element",
        title: "広告を削除する",
        contexts: ["all"],  // 右クリックメニューが表示されるコンテキストを指定
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    // コンテキストメニューがクリックされた時
    if (info.menuItemId === 'remove_element') {
        console.log('tabId', tab.id);  // タブのIDを確認

        // コンテンツスクリプトを実行
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                console.log('run func.');
                // コンテンツスクリプト内の処理
                chrome.runtime.sendMessage("getClickedEl", (response) => {
                    console.log('send Message.');
                    // クリックした要素を削除
                    if (response && response.value) {
                        console.log('Element to remove:', response.value);
                        // ここで要素を削除します
                        const elementToRemove = document.querySelector(response.value);
                        if (elementToRemove) {
                            elementToRemove.remove();
                            console.log('Element removed');
                        } else {
                            console.log('Element not found');
                        }
                    }
                });
            },
        });
    }
});