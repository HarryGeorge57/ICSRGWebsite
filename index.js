const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;


//use body parser middleware
app.use(bodyParser.urlencoded({exended: false}));

//Set Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


//Set handelbar index GET routes
app.get('/', function (req, res){
            res.render('home');
});


//Create About Page Route
app.get('/about.html', function (req, res){
    res.render('about');
});
app.get('/showcase.html', function (req, res){
    res.render('showcase');
});
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
