//スイッチの外枠とスイッチの要素を取得
const switchOuter = document.querySelector(".switch_outer");
const toggleSwitch = document.querySelector(".toggle_switch");

//クリックでacitveクラスを追加/削除
switchOuter.addEventListener('click', () => {
    switchOuter.classList.toggle("active");
    toggleSwitch.classList.toggle("active");
});

// debug用
const button = document.querySelector('button');
button.addEventListener('click', () => {
    console.log('');
});