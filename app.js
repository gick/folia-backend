// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');

var morgan=require('morgan')
var firebase = require("firebase-admin");
const fileUpload = require('express-fileupload');
var fs=require('fs')
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');


// configuration files that are set up using serverSetup
var dbConfig=require('./app/config/config.json')
var serviceAccount = require("./serviceAccountKey.json");

var app = express();
var port = 8081;
Grid.mongo = mongoose.mongo;
mongoose.connect(dbConfig.mongoURL)
var gfs = new Grid(mongoose.connection.db);
app.use(morgan('dev')); // log every request to the console

app.use(fileUpload());
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: dbConfig.firebaseURL
  });
var fireDB =firebase.database()
require('./app/route/routes.js')(app,fireDB,gfs); // load our routes and pass in our app and fully configured passport
app.listen(port);
