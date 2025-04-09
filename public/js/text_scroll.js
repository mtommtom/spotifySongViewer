// will make scroll animation
function set_text_scroll() {
    const s_n = document.getElementById('s_n');
    /*
    should be
    (#body width - #i width) / 2 + #i width
    */
    const bodyWidth = document.getElementById('body').clientWidth;
    const iWidth = document.getElementById('i').clientWidth;
    const divLength = (bodyWidth - iWidth) / 2 + iWidth;
    const textLength = s_n.scrollWidth;

    // if text box (#s_n) is large enough
    if(textLength > iWidth) {
        console.log('scroll')
        // apply scroll
        let elm = document.getElementById('s_n')
        elm.innerText = elm.innerText.slice(0, 14) + '...'
    } else {
        console.log('removescroll');
        document.getElementById('s_n').classList.remove('track');
    }
}