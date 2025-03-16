const your_client_id = '78a0c3bc5bf340be852f5d581131b676';
const your_client_secret = '33693dfb760044b997ee3483a1a8f2fc';
var access_token = '';

function get_api_credentials() {
    const response = fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        'grant_type': 'client_credentials',
        'client_id': your_client_id,
        'client_secret': your_client_secret
      })
    })
    .then(response => response.json())
    .then(data => {
        access_token = data.access_token;
    });
}

function refresh() {
    if (access_token == '') return;

    console.log(access_token)
    fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { 'Authorization': 'Bearer ' + access_token }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.name)
    });

    const song_name = $('#s_n');
}

get_api_credentials()
setInterval(refresh, 5000);