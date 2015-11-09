//this will take the mongoose and create a REST API for all CURD Operations
var restful = require('node-restful');
module.exports = function(app, route) {

  //Setup the controller for REST
  var rest = restful.model('movie',app.models.movie).methods(['get','put','post','delete']);

  //register this endpoint with the application
  rest.register(app, route);

  // Return middlewear.
  return function(req, res, next) {
    next();
  };
}
