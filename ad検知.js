let ad1 = document.querySelectorAll('div[id*="ad"]:not([id*="head"])'); // headを含めない
const CrossImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJXYVCbpXdstc30mEWtspHcixWtjN83WZdccPF9QNtF2S9Bykwp5TcMVT8jB4FNEBModDyO_HR5BYIYCvqg_VzEXhbKy7gymQU35n5cpfBr53L_5l9rNqiiz6yR-D1aAOMlpdsvqgXMlI6/s800/mark_batsu.png";

const img = document.createElement('img');
img.src = CrossImage;
img.style.position = 'absolute';
img.style.display = 'none';
img.style.width = '200px';
img.style.height = '200px';
img.style.zIndex = '99999999'; // ✖印の奥行（値が大きいほど手前にくる）
document.body.appendChild(img);

ad1.forEach(div => {
    div.classList.add('GoogleADs');
    
    div.addEventListener("mouseover", function () {
        const rect = div.getBoundingClientRect();
        img.style.left = `${rect.left + window.scrollX}px`;
        img.style.top = `${rect.top + window.scrollY}px`;
        img.style.display = 'block';
    }, false);
    
    div.addEventListener("mouseout", function() {
        img.style.display = 'none';
    }, false);
    
    // 画像に対してマウスオーバー時のイベントを追加
    img.addEventListener("mouseover", function() {
        img.style.display = 'block'; // 画像が見えている場合は常に表示
    }, false);
    
    img.addEventListener("mouseout", function() {
        img.style.display = 'none'; // マウスが外れたときに非表示
    }, false);
    
    console.log(div);
});
