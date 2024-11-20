document.addEventListener('DOMContentLoaded', function() {
    var toggleSwitch = document.getElementById('extensionToggle');

    // 初期状態をONに設定
    chrome.storage.sync.get('extensionEnabled', function(data) {
        if (data.extensionEnabled === undefined) {
            // 初回起動時は拡張機能をONに設定
            chrome.storage.sync.set({extensionEnabled: true});
            toggleSwitch.checked = true;
        } else {
            toggleSwitch.checked = data.extensionEnabled;
        }
    });

    // トグルスイッチの状態が変更されたときの処理
    toggleSwitch.addEventListener('change', function() {
        var isEnabled = this.checked;
        chrome.storage.sync.set({extensionEnabled: isEnabled}, function() {
            console.log('Extension is now ' + (isEnabled ? 'enabled' : 'disabled'));
        });

        // 背景スクリプトに状態変更を通知
        chrome.runtime.sendMessage({action: "toggleExtension", enabled: isEnabled});
    });
});