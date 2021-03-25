const request = require('request')

const forecast = (lat, long, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=3eeca5a78dc885f10a723c5095107b54&query=${lat},%${long}&units=f`
    //destructuring 'body' object from response
    request({ url, json: true }, (err, { body } = {}) => {
        if (err) cb('Unable to connect to weather service')
        else if (body.error) {
            cb('No matching results found, try another search.')
        } else {
            cb(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`)
        }
    })
}
module.exports = forecast