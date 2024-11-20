// //スイッチの外枠とスイッチの要素を取得
// const switchOuter = document.querySelector(".switch_outer");
// const toggleSwitch = document.querySelector(".toggle_switch");

// //クリックでacitveクラスを追加/削除
// switchOuter.addEventListener('click', () => {
//     switchOuter.classList.toggle("active");
//     toggleSwitch.classList.toggle("active");
// });

document.addEventListener('DOMContentLoaded', function() {
    var toggleSwitch = document.getElementById('extensionToggle');

    // 保存された状態を読み込む
    chrome.storage.sync.get('extensionEnabled', function(data) {
        toggleSwitch.checked = data.extensionEnabled !== false;
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