let ad1 =document.querySelectorAll('div[id*="ad"]');
const CrossImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJXYVCbpXdstc30mEWtspHcixWtjN83WZdccPF9QNtF2S9Bykwp5TcMVT8jB4FNEBModDyO_HR5BYIYCvqg_VzEXhbKy7gymQU35n5cpfBr53L_5l9rNqiiz6yR-D1aAOMlpdsvqgXMlI6/s800/mark_batsu.png"
ad1.forEach(div =>{
    div.classList.add('GoogleADs');
    const img = document.createElement('img');
    img.src = CrossImage;
    img.style.position = 'absolute';
    img.style.display = 'none';
    img.style.width = '200px';
    img.style.height = '200px';
    img.style.left ='1000';
    img.style.top ='100';
    document.body.appendChild(img);
    div.addEventListener("mouseover", function () {
        img.style.display = 'block';
    }, false);
    addEventListener("mouseout", function() {
        img.style.display = 'none';
    }, false);
    console.log(div);
});
