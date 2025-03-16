const client_id = '78a0c3bc5bf340be852f5d581131b676';
const client_secret = '33693dfb760044b997ee3483a1a8f2fc';
const redirect_uri = 'http://localhost/callback'
const scope = 'user-read-currently-playing'
var redi = 'https://accounts.spotify.com/authorize?' +
    'response_type=code&' + 
    'client_id=' + client_id + '&' +
    'scope=' + scope + '&' +
    'redirect_uri=' + redirect_uri + '';

function redirect(x) {
    window.location.href = x;
    window.location.replace(x);
}

// write a function that will redirect to the authorize page which will make it possible to get access code in backend
function get_access_code() {
    var x = window.location.href;
    const part = x.split('=');
    if (part.length < 2) {
        redirect(redi);
    }
}
