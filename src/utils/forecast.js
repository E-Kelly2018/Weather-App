const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=0eb184744720d8a3cbff6266610d7da3&query=' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
      if(error) {
        callback('unable to connect to weather service', undefined);
      } else if(body.error) {
        callback('unable to find location', undefined)
      } else {
        callback(undefined, "Its currently " + body.current.temperature + " degress out. But it feels like " + body.current.feelslike + " degress");
      }
    })
}

module.exports = forecast
