const request = require('request');

const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    'philadelphia.json?' +
    'access_token=pk.eyJ1Ijoibmd1eWVuODU4NSIsImEiOiJjanQ2ajM0bGgwaHIzNDNsamNhbjg4NmtlIn0.U7bUMJXrpja1BwD8z4eNDQ' +
    '&limit=1'


const geocode = (address, callback) => {
    const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) + '.json?' +
        'access_token=pk.eyJ1Ijoibmd1eWVuODU4NSIsImEiOiJjanQ2ajM0bGgwaHIzNDNsamNhbjg4NmtlIn0.U7bUMJXrpja1BwD8z4eNDQ' +
        '&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data);
        }
    })
}

module.exports = geocode;