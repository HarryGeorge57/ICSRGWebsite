const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

//iRacing Driver Data Importing
const fetch = require('node-fetch'); //this may be outdated with the newest node.js, but plenty of docs exist for including other files
﻿var loginCookies = '';


sync function getAuth()
{
    console.log('AUTH')
    const accessReply = await fetch('https://members-ng.iracing.com/auth', {
        method: 'POST',
        body:   JSON.stringify(
        {
            "email": iRacingEmailforauth,
            "password": iRacingPassword
        }),
        credentials: 'include',
        headers: {'Accept': '*/*', "Content-type": "application/json"}
    })
    const replyBody = await accessReply.json();
    var statusCode = await accessReply.status;
    console.log(stringTime() + "Auth status code: " + statusCode)
    if(statusCode == 200)
    {
        delay = originalDelay;
    }
    if(statusCode == 503)
    {
        delay = maintenceDelay;
    }
    loginCookies = parseCookies(accessReply);
    return statusCode;
}


function parseCookies(response) 
{
    const raw = response.headers.raw()['set-cookie'];
    return raw.map((entry) => {
      const parts = entry.split(';');
      const cookiePart = parts[0];
      return cookiePart;
    }).join(';');
}

//use body parser middleware
app.use(bodyParser.urlencoded({exended: false}));

//Set Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


//Set handelbar index GET routes
app.get('/', function (req, res){
            res.render('home');
});


//Page Routing
//About
app.get('/about.html', function (req, res){
    res.render('about');
});
//Drivers
app.get('/drivers.html', function(req, res){
    res.render('drivers');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
