const request = require('request')
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibHUtZ2Zsb3JlcyIsImEiOiJja21tMno0bnowa2w2MnRwbHV2azhqNHg0In0.LHLW5byiV9GuYH5ru6dkdg&limit=1`
    //destructuring from 'res' object
    request({ url, json: true }, (err, { body } = {}) => {
        if (err) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('No matching results found, try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode