const axios = require('axios');
require('dotenv').config();

let getPlaces = function(req, res, next) {
  if(req.body.lat === undefined) {
    res.locals.lat = 39.800138;
    res.locals.lng = -75.534868;
  } else {
    res.locals.lat = req.body.lat;
    res.locals.lng = req.body.lng;
  }

  axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${res.locals.lat},${res.locals.lng}&rankby=distance&type=bar&key=${process.env.PLACES_KEY}`)
  .then((geoRes) => {

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
      // console.log(res.locals.locations)
    res.locals.places = results
    return next();
  }).catch((err) => {
    console.error(err);
    return next();

})
}


module.exports = {
  getPlaces,
}
