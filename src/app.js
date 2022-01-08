const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { rmSync } = require('fs')
const { features } = require('process')
const { request } = require('http')
const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to use with express
app.use(express.static(path.join(__dirname, '../public')))


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Eoin Kelly'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    name: 'Emma Kelly'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: "Eoin Kelly",
    message: 'This is a help page'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an addrress'
    })
  }

  geoCode(req.query.address, (error, {latitude, longitude,location} = {}) => {
    if (error) {
      return res.send({
        error: 'There was a problem please try again'
      })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ 
          error: 'There was a problem please try again'
        })
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
      return res.send({
        error: 'You must provide a search term'
      })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Eoin Kelly',
    errorMessage: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Eoin Kelly',
    errorMessage: 'Page not found'
  })
})


app.listen(port, () => {
  console.log('server running on port ' + port);
}) 
