const CrossImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJXYVCbpXdstc30mEWtspHcixWtjN83WZdccPF9QNtF2S9Bykwp5TcMVT8jB4FNEBModDyO_HR5BYIYCvqg_VzEXhbKy7gymQU35n5cpfBr53L_5l9rNqiiz6yR-D1aAOMlpdsvqgXMlI6/s800/mark_batsu.png";
let named_ad;

// 広告ごとに個別の画像を表示する関数
function handleAd(div) {
    div.classList.add('GoogleADs');

    // 各広告ごとに画像を作成
    const img = document.createElement('img');
    img.src = CrossImage;
    img.style.position = 'absolute'; // 画像がスクロールに合わせて動く
    img.style.display = 'none'; // 初めは非表示
    img.style.zIndex = '1000000000'; // 画像を最前面に表示
    img.style.pointerEvents = 'auto'; // クリック可能にする
    document.body.appendChild(img);

    // 広告に画像を関連付ける
    img.ad = div;  // 画像に対応する広告をセット
    div.img = img; // 広告に対応する画像をセット

    // 広告にマウスオーバー時の処理
    div.addEventListener("mouseover", function () {
        chrome.storage.sync.get('extensionEnabled', (data) => {
            if (data.extensionEnabled) {
                const rect = div.getBoundingClientRect();  // 広告の位置を取得
                img.style.left = `${rect.left + window.scrollX}px`; // スクロール位置を考慮
                img.style.top = `${rect.top + window.scrollY}px`; // スクロール位置を考慮
                img.style.display = 'block'; // 画像を表示
                let img_size = Math.hypot(div.offsetHeight, div.offsetWidth) / 4;
                img.style.width = `${img_size}px`;
                img.style.height = `${img_size}px`;

                // 同じz-indexを持つ画像が重なって表示されている場合
                // 片方だけ表示する
                const allImages = document.querySelectorAll('img');
                allImages.forEach(otherImg => {
                    if (otherImg !== img && Math.abs(parseInt(otherImg.style.zIndex) - parseInt(img.style.zIndex)) <= 1) {
                        otherImg.style.display = 'none'; // 片方の画像を非表示
                    }
                });
            }
        named_ad = div;
        });
    }, false);

    // 広告からマウスが離れたときの処理
    div.addEventListener("mouseout", function () {
        img.style.display = 'none'; // 画像を非表示
    }, false);

    // 画像にマウスオーバー時の処理
    img.addEventListener("mouseover", function () {
        img.style.display = 'block'; // 画像が見えている場合は常に表示
    }, false);

    // 画像からマウスが離れたときの処理
    img.addEventListener("mouseout", function () {
        img.style.display = 'none'; // 画像を非表示
    }, false);

    // 画像がクリックされたときの処理
    img.addEventListener("click", function () {
        // クリックされた広告のz-indexを取得
        const clickedAdZIndex = parseInt(window.getComputedStyle(div).zIndex);

        // すべての広告を取得
        const allAds = document.querySelectorAll('.GoogleADs');

        // zIndexの差が±10以内の広告を削除
        allAds.forEach(ad => {
            if (window.getComputedStyle(ad).zIndex == "auto") {
                const adZIndex = parseInt(window.getComputedStyle(ad).zIndex);
                if (Math.abs(adZIndex - clickedAdZIndex) <= 10) {  // 差が±10以内
                    ad.remove(); // 削除
                }
            }
        });
        named_ad.remove();
    });
}

// 既存の広告を処理
const ad1 = document.querySelectorAll('div[id*="ad"]:not([id*="head"]):not([id*="graduate"])'); // headを含めない
ad1.forEach(handleAd);

// MutationObserverで新しい広告の追加を監視
const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE && node.id && node.id.includes("ad") && !node.id.includes("head")) {
                    handleAd(node);
                }
            });
        }
    }
});

// 監視対象を設定
observer.observe(document.body, { childList: true, subtree: true });

// 既存の広告要素にも適用
ad1.forEach(handleAd);

