export function buttonUp () {
    window.onscroll = () => {
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        const upButton = document.getElementById("upbutton");
        if (upButton !== null) {
            if (scrolled > 500) {
                upButton.style.display = "block";
            } else {
                upButton.style.display = "none";
            }
        }
    };
}
