let ad1 =document.querySelectorAll('div[id*="google_ads_iframe"]');
ad1.forEach(div =>{
    div.classList.add('GoogleADs');
    //console.log(div);
    div.remove();
}) ;