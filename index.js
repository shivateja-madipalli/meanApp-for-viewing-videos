var express = require('express');
var mongoose = require('mongoose');
var bodyParser  = require('body-parser');
var methodOverride  = require('method-override');
var _  = require('lodash');

//Creating the application
var app = express();
// var server = app.listen(8081, function() {
//     console.log(new Date().toISOString() + ": server started on port 8081");
// });

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//CORS Support
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


//testing - not required for rest API
// app.use('/hello', function(req,res,next){
//   res.send("Hello World!");
//   next();
// });

//Connecting to MongoDB
//mongodb://<dbuser>:<dbpassword>@ds047504.mongolab.com:47504/meanapp

mongoose.connect('mongodb://shivateja:1234@ds047504.mongolab.com:47504/meanapp');
mongoose.connection.once('open',function(){
  // if(err)
  // {
  //   console.log("This is the error:"+err);
  // }

  //this is dependency injection
  //loading models
  app.models = require('./Models/index');

  //loading routes
  var routes = require('./routes');
  //the below line will traverse through all of the routes defined in the routes file
  //and assign value to "controller" and key to "route" accordingly.
  _.each(routes, function(controller, route){
    app.use(route, controller(app,route));
  });
  console.log('Listening on port 3000');

  app.listen(3000);
});


//Load the models
