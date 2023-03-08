const keys = document.querySelectorAll(".key");
for (let key of keys) {
    key.addEventListener("click", ()=> {
        let code = key.getAttribute("data-key");
        let audio = document.querySelector(`audio[data-key="${code}"]`);
        console.log(audio);
        audio.classList(".playing").toggle();
        audio.play();
    });
}
window.addEventListener("keydown", (e) => {
    let audio = document.querySelector(`audio[data-key="${e.code}"]`);
    console.log(audio);
    audio.classList(".playing").toggle();
    audio.play();
})