//スイッチの外枠とスイッチの要素を取得
const switchOuter = document.querySelector(".switch_outer");
const toggleSwitch = document.querySelector(".toggle_switch");

let on_action = true;
const toggle_action = () => {
    on_action = !on_action;
}

//クリックでacitveクラスを追加/削除
switchOuter.addEventListener('click', () => {
    switchOuter.classList.toggle("nonactive");
    toggleSwitch.classList.toggle("nonactive");
    toggle_action();
});

// debug用
const button = document.querySelector('button');
button.addEventListener('click', () => {
    console.log('action:', on_action);
});