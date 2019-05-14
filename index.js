const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/config');


const webpush = require("web-push");

const publicVapidKey =
    "BFK4CAr3kSmUtb_rq2yBP4KE3XpTsYLNZal1uwPd0mUDzSjcgaAKRJixFH_0Pv0v2jLIw5a6TxBd6RPUCkL5aYU";
const privateVapidKey = "rMkJ0VQMtOZkRV7TsNb3PCQ2QDhaI_U55MbYX74CQXw";


webpush.setVapidDetails(
    "mailto:booz2449@gmail.com",
    publicVapidKey,
    privateVapidKey
);


mongoose.connect(config.database, { useNewUrlParser: true });

let db = mongoose.connection;

// Check DB connection
db.once('open', function () {
    config.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function (err) {
    config.log(`DB Error: ${err}`);
});

const app = express();

// Body Parser MiddleWare
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(cookieParser());

if (config.isDevelopment) {
    console.log(`We're on developement :)`);

    // Express session Middleware
    // app.use(session({
    //     secret: 'keyboard cat',
    //     resave: true,
    //     saveUninitialized: true,
    // }));

    // const cors = require('cors');
    // app.use(cors());

    // app.use(cors({
    //     origin: 'http://localhost:3005',
    //     credentials: true,
    //     exposedMethods: ['Content-Length', 'Options']
    // }));

    // app.use(function (req, res, next) {

        // res.setHeader('Access-Control-Allow-Origin', req.header('origin')
        //     || req.header('x-forwarded-host') || req.header('referer') || req.header('host'));
        //
        // res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        //
        // res.header('Access-Control-Allow-Origin', req.headers.origin);
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //
        //
        // res.header('Access-Control-Allow-Origin', 'http://localhost:3005');
        //
        // res.header("Access-Control-Allow-Headers","*");
        // res.header('Access-Control-Allow-Credentials', true);
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');



        // Cookies that have not been signed
        // console.log('Cookies: ', req.cookies);

        // Cookies that have been signed
        // console.log('Signed Cookies: ', req.signedCookies);

        // next();
    // });



    // for fuck's sake we dont need these configuration on online server
    // Access Control Allow configuration
    // with this configuration both first Option req and next req statuses would be 200 OK :)
    app.use(function(req, res, next) {

        // res.header('Access-Control-Allow-Origin', 'http://localhost:3005');
        // res.header('Access-Control-Allow-Credentials', true);
        // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        next();
    });
}



let students = require('./routes/students');
app.use('/api/student', students);



const port = 4010;

app.listen(port, config.hostAddress, () => config.log(`Server Started on port ${port}`));