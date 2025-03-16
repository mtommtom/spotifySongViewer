const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// package import
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const request = require('request');
const queryString = require('querystring');

// constansts
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const scope = process.env.SCOPE;


// init imporconst t
const app = express();

// middleware
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// constants
const PORT = 80;

// routing
app.get('/', (req, res) => {
    const access_token = req.query.access_token;
    const refresh_token = req.query.refresh_token;

    if (access_token === undefined) {
        res.render('app', {access_token: '', refresh_token: ''});
    } else {
	    res.render('app', {access_token: access_token, refresh_token: refresh_token});
    }
});

app.get('/callback', (req, res) => {
    // if there is no acess token given get it
    const code = req.query.code;
    var access_code_request = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };
    // make request to spotify for acess code
    request.post(access_code_request, (err, response, body) => {
        // if no errors!
        if (!err && response.statusCode === 200) {
            var access_token = body.access_token;
            var refresh_token = body.refresh_token;

            res.redirect(`/?access_token=${access_token}&refresh_token=${refresh_token}`);
        } else {
            res.send('error awe man');
        }
    });
});

// run server
app.listen(PORT, () => {
	console.log(`running on port ${PORT}`);
});
