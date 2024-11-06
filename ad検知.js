let ad1 = document.querySelectorAll('div[id*="ad"]');
const CrossImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJXYVCbpXdstc30mEWtspHcixWtjN83WZdccPF9QNtF2S9Bykwp5TcMVT8jB4FNEBModDyO_HR5BYIYCvqg_VzEXhbKy7gymQU35n5cpfBr53L_5l9rNqiiz6yR-D1aAOMlpdsvqgXMlI6/s800/mark_batsu.png";
let named_ad;

const img = document.createElement('img');
img.src = CrossImage;
img.style.position = 'absolute';
img.style.display = 'none';
document.body.appendChild(img);

ad1.forEach(div => {
    div.classList.add('GoogleADs');
    
    div.addEventListener("mouseover", function () {
        named_ad = div;
        const rect = div.getBoundingClientRect();
        img.style.left = `${rect.left + window.scrollX}px`;
        img.style.top = `${rect.top + window.scrollY}px`;
        img.style.display = 'block';
        let img_size = Math.hypot(div.offsetHeight, div.offsetWidth) / 4;
        img.style.width = `${img_size}px`;
        img.style.height = `${img_size}px`;
    }, false);
    
    div.addEventListener("mouseout", function() {
        img.style.display = 'none';
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
