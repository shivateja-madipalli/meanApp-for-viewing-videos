// this is when we have many models
//and whenever someone says "require index.js"
//they'll get all of these
//like a registry of all the models.
//who ever wants to add and get the list of models

module.exports = {
  movie: require('./Movie.js')
};
