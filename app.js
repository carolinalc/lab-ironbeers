const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + "/views/beerpartial")
app.use(express.static(path.join(__dirname, 'public')));




// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beer', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
 
    res.render('beers.hbs', {
      beer: beersFromApi
    })
    console.log('Beers from the database: ', beersFromApi)
  
  })
  .catch(error => console.log(error));
  
});
 


app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(responseFromAPI => {
    res.render('random.hbs',{
      todo: responseFromAPI
    });
  })
  .catch(error => console.log(error));

});


app.get('/unasola/:marca', (req, res) => {
  const {marca} = req.params
  punkAPI.getBeers(marca)
  .then(beersFromApi => {
 
    res.render('unasola.hbs', {
      lasola: beersFromApi
    })
    console.log(beersFromApi);
  })
  .catch(error => console.log(error));
  
});

app.listen(3003, () => console.log('🏃‍ on port 3000'));
