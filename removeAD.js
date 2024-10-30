let ad1 =document.querySelectorAll('div[id*="google_ads_iframe"]');

ad1.forEach(div =>{
    div.classList.add('GoogleADs');
    console.log(div);
}) ;

// debug用
document.addEventListener('click', () => {
    Array.from(ad1).map(ad => {
        console.log(ad);
    })
});