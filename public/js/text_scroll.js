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
    console.log('divLength: ' + divLength);
    const textLength = s_n.scrollWidth;

    // if text box (#s_n) is large enough
    if(textLength > divLength) {
        console.log('scroll')
        // find scroll amount
        const dif = textLength - divLength;
        // apply scroll
        document.getElementById('s_n').classList.add('scroll');
    } else {
        console.log('removescroll')
        document.getElementById('s_n').classList.remove('scroll')
    }
}