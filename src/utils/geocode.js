const request = require('request');

const geoCode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5kcm9pZGtlbGx5IiwiYSI6ImNreTFwcXVpcTAydDQybmw1MXB2cWlkZ2YifQ.lI65gj6j3Az6QTSRQPpUIw'
  request({url, json:true}, (error, {body}) => {
    if (error) {
      callback('Unable to connectg to location services', undefined)
    } else if(body.features.length === 0) {
      callback('Unable to find location try another search', undefined)
    } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name
        })
    }
  })
}

module.exports = geoCode
