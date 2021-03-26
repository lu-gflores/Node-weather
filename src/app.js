const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//custom views folder for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')))


app.get('/', (req, res) => {
    //index.hbs file, passing an object to render in the file 
    res.render('index', {
        title: 'Weather',
        name: 'George F.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'George F.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'George F.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        })
    }
    //destructuring from 'data' object
    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {

        if (err) return res.send({ err })

        forecast(latitude, longitude, (err, forecastData) => {
            if (err) return res.send({ err })

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    //if there is no search query send error message
    if (!req.query.search) {
        //stops the search function
        return res.send({
            error: 'Must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: '404',
        name: 'George F.',
        message: 'Help article not found.'
    })
})



/* wildcard character to match anything*/

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'George F.',
        errorMessage: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log('Listening on port ' + port)
})