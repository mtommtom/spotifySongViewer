// get the acess token (run auth.js)
get_access_code();
var s_name = '';
var s_image = '';
var s_username = '';
var s_profile_image = '';

// if there are avalaible tokens
if (refresh_token !== '' && access_token !== '') {
    setInterval(refresh, 500)
    // refresh();
}

// check for new songs
function refresh() {
    fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { 'Authorization': 'Bearer ' + access_token }
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            // no song playing
            return -1;
        }
    })
    .then(data => {
        load(data);
    });
}

// load all the data (given data object) into the correct fields
function load(data) {
    if (data === -1) {
        // if not currently located in profile page
        if ($('#profile').css('display') === 'none' || s_username === '') {
            // no song playing so display profile
            $('#currently_playing').css('display', 'none');
            $('#profile').css('display', 'block');

            // if there is no already found profile
            if (s_username === '' && s_profile_image === '') {
                reqUserProfile();
            } else {
                loadUserProfile()
            }
        }
    } else {
        // make this visible
        if ($('#currently_playing').css('display') === 'none') {
            $('#profile').css('display', 'none');
            $('#currently_playing').css('display', 'block');
        }

        const song_name = $('#s_n');
        const image = $('#i');

        /*
        if the song isn't current displayed song
        in other words: on update content
        */
        if (s_image !== data.item.album.images[0].url || s_name !== data.item.name) {
            s_name = data.item.name;
            s_image = data.item.album.images[0].url;

            song_name.html(s_name);
            image.attr('src', s_image);

            colorBackground(s_image);
            set_text_scroll();
        }
    }
}

// fill dom with new values for profile
function loadUserProfile() {
    // if no image is loaded - load image
    const profile_image = $('#profile_image');
    const username = $('#username');
    profile_image.attr('src', s_profile_image);
    username.html(s_username);
}

// get new values for profile in api
function reqUserProfile() {

    fetch('https://api.spotify.com/v1/me/', {
        headers: { 'Authorization': 'Bearer ' + access_token }
    })
    .then(response => response.json())
    .then(data => {
        s_profile_image = data.images[0].url;
        s_username = data.display_name
        loadUserProfile();
    });
}

// load image to prepar color background
function colorBackground(link) {
  let imageURL = link
  let imageDescription = "";

  downloadedImg = new Image();
  downloadedImg.crossOrigin = "anonymous";
  downloadedImg.addEventListener("load", color, false);
  downloadedImg.alt = imageDescription;
  downloadedImg.src = imageURL;
}

// when image is recvied actually color
function color() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    
    canvas.width = downloadedImg.width;
    canvas.height = downloadedImg.height;
    canvas.innerText = downloadedImg.alt;
    
    context.drawImage(downloadedImg, 0, 0);
    
    try {
      localStorage.setItem("img", canvas.toDataURL("image/png"));
    } catch (err) {
      console.error(`Error: ${err}`);
    }

    $('#it').attr('src', localStorage.getItem('img'));
    const fac = new FastAverageColor();
    fac.getColorAsync(document.querySelector('#it'))
        .then(color => {
            console.log(color);
            document.getElementById('body').style.background = `linear-gradient(${color.hex}, rgba(0, 0, 0, 0.9)`;
        })
        .catch(e => {
            console.log(e);
        });
}