let ad1 = document.querySelectorAll('div[id*="ad"]:not([id*="head"])'); // headを含めない
const CrossImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJXYVCbpXdstc30mEWtspHcixWtjN83WZdccPF9QNtF2S9Bykwp5TcMVT8jB4FNEBModDyO_HR5BYIYCvqg_VzEXhbKy7gymQU35n5cpfBr53L_5l9rNqiiz6yR-D1aAOMlpdsvqgXMlI6/s800/mark_batsu.png";
let named_ad;

const img = document.createElement('img');
img.src = CrossImage;
img.style.position = 'absolute';
img.style.display = 'none';
document.body.appendChild(img);

const canvas = document.createElement('canvas');
canvas.id = 'myCanvas';
canvas.style.position = 'absolute';
canvas.style.zIndex = '99999998';
canvas.style.pointerEvents = 'none';
canvas.style.display = 'none';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

ad1.forEach(div => {
    div.classList.add('GoogleADs');

    div.addEventListener("mouseover", function () {
        chrome.storage.sync.get('extensionEnabled', (data) => {
            if (data.extensionEnabled) {
                named_ad = div;
                const rect = div.getBoundingClientRect();
                img.style.left = `${rect.left + window.scrollX}px`;
                img.style.top = `${rect.top + window.scrollY}px`;
                img.style.display = 'block';

                let img_size = Math.hypot(div.offsetHeight, div.offsetWidth) / 4;
                img.style.width = `${img_size}px`;
                img.style.height = `${img_size}px`;
                img.style.zIndex = '99999999'; // ✖印の奥行（値が大きいほど手前にくる）

                canvas.style.left = `${rect.left + window.scrollX}px`;
                canvas.style.top = `${rect.top + window.scrollY}px`;
                canvas.width = img_size;
                canvas.height = img_size;
                canvas.style.display = 'block';

                ctx.fillStyle = "rgba(" + [10, 10, 10, 0.7] + ")";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        });
    }, false);

    div.addEventListener("mouseout", function() {
        img.style.display = 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, false);

    console.log(div);
});

// 画像に対してマウスオーバー時のイベントを追加
img.addEventListener("mouseover", function() {
    img.style.display = 'block'; // 画像が見えている場合は常に表示
}, false);

img.addEventListener("mouseout", function() {
    img.style.display = 'none'; // マウスが外れたときに非表示
}, false);

img.addEventListener("click", function() {
    named_ad.remove(); // 画像がクリックされたら広告を削除
});
