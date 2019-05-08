const request = require('request');
const darkskyUrl = 'https://api.darksky.net/forecast/e22327ad237c4418fc6b50a7718750ec/37.8267,-122.4233';

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/e22327ad237c4418fc6b50a7718750ec/' +
        latitude + ',' +
        longitude;

    request({ url, json: true}, function (error, {body}) {
        if (error) {
            callback('Unable to connect ot weather service!');
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = {
                temperature: body.currently.temperature,
                precipProbabilitY: body.currently.precipProbability,
                summary: body.daily.data[0].summary
            }
            callback(error, `${data.summary} It is currently ${data.temperature} degrees out. There is a ${data.precipProbabilitY} % chance of rain.`);

        }
    });
}

module.exports = forecast;