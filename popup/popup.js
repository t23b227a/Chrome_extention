document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('extensionToggle');

    // 保存された状態を読み込んでトグルスイッチに反映
    chrome.storage.sync.get('extensionEnabled', (data) => {
        if (data.extensionEnabled === undefined) {
            // 初回起動時は拡張機能をONに設定
            chrome.storage.sync.set({extensionEnabled: true});
            toggleSwitch.checked = true;
        } else {
            toggleSwitch.checked = data.extensionEnabled;
        }
    });

    // トグルスイッチの状態が変更されたときの処理
    toggleSwitch.addEventListener('change', () => {
        const isEnabled = toggleSwitch.checked;
        chrome.storage.sync.set({extensionEnabled: isEnabled}, () => {
            console.log('Extension is now ' + (isEnabled ? 'enabled' : 'disabled'));
        });

        // backgroundスクリプトに状態変更を通知
        chrome.runtime.sendMessage({action: "toggleExtension", enabled: isEnabled});
    });
});