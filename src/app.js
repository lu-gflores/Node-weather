const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
    res.send({
        location: 'Long Island, New York',
        forecast: 'Partly Cloudy.'
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

app.listen(3000, () => {
    console.log('Listening on port 3000')
})