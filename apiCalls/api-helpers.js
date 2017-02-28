const axios = require('axios');
require('dotenv').config();

let getLocation = function(req, res, next) {
  axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + `${process.env.GEO_API}`)
  .then((geoRes) => {
    res.locals.lat = geoRes.data.location.lat,
    res.locals.long = geoRes.data.location.lng
  }).then(() => {

  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.7410986,-73.9888682&rankby=distance&type=bar&key=${process.env.PLACES_KEY}`)
  .then((geoRes) => {
    console.log(geoRes.config.url);
    let results = [];
    for(let i = 0; i < (geoRes.data.results.length); i++) {
      if(geoRes.data.results[i].opening_hours === undefined){
      let arr = [geoRes.data.results[i].name, geoRes.data.results[i].vicinity, "?",
      geoRes.data.results[i].price_level, geoRes.data.results[i].rating];
      results.push(arr);
    } else if(geoRes.data.results[i].price_level === undefined) {
        let arr = [geoRes.data.results[i].name, geoRes.data.results[i].vicinity, geoRes.data.results[i].opening_hours.open_now,
      "?", geoRes.data.results[i].rating];
      results.push(arr);
    } else if(geoRes.data.results[i].photos === undefined){
        let arr = [geoRes.data.results[i].name, geoRes.data.results[i].vicinity, geoRes.data.results[i].opening_hours.open_now,
      geoRes.data.results[i].price_level, geoRes.data.results[i].rating];
      results.push(arr);
    } else {
      let arr = [geoRes.data.results[i].name, geoRes.data.results[i].vicinity, geoRes.data.results[i].opening_hours.open_now,
      geoRes.data.results[i].price_level, geoRes.data.results[i].rating, geoRes.data.results[i].photos[0].photo_reference];
      results.push(arr);
    }

    }
    let locations = [];
      for(let i = 0; i < geoRes.data.results.length; i++) {
        let locArr = [geoRes.data.results[i].name, geoRes.data.results[i].geometry.location.lat,
          geoRes.data.results[i].geometry.location.lng, i + 1];
        locations.push(locArr)
      }
      res.locals.locations = locations
      console.log(res.locals.locations)
    res.locals.places = results
    return next();
  }).catch((err) => {
    console.error(err);
    return next();

})
})
};


module.exports = {

  getLocation
}
