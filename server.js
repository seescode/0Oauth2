var express = require('express');
var app = express();

app.use(express.static('public'));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

var oauth2 = require('simple-oauth2')({
  clientID: '8589e88e8cf2145fa630',
  clientSecret: '45ae166f03308e0f82af3fa6a1a5f29dc5f36709',
  site: 'https://github.com/login',
  tokenPath: '/oauth/access_token',
  authorizationPath: '/oauth/authorize'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'http://oauth2-test/callback',
  scope: 'notifications',
  state: '3(#0/!~'
});

// Initial page redirecting to Github
app.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', function (req, res) {
  var code = req.query.code;
  console.log('/callback');
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: 'http://oauth2-test/callback'
  }, saveToken);

  function saveToken(error, result) {
    if (error) { console.log('Access Token Error', error.message); }
    token = oauth2.accessToken.create(result);
    
    console.log('to-token', token);
  }
});


app.listen(80, function() {
	console.log("site is running at http://oauth2-test");
});
