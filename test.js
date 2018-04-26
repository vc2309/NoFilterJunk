const imdb = require('imdb-api');
console.log("hi");
var movie={};
movie=imdb.get('The Toxic Avenger', {apiKey: "c5f84055", timeout: 30000});
      console.log(movie);