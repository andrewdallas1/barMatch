var express = require('express');
var router = express.Router();
const authHelpers = require('../auth/auth-helpers');
const apiHelpers = require('../apiCalls/api-helpers');
const axios = require('axios');

require('dotenv').config();

/* GET users listing. */
router.get('/', authHelpers.loginRequired, apiHelpers.getPlaces, (req, res, next) => {
  console.log('places ======>' + req.body.lat);
  res.render('user/index', {
    user: req.user.dataValues,
    places: res.locals.places,
    locations: res.locals.locaitons,
    map: apiHelpers.initMap
  });

});

// router.get('/', (req, res, next) => {
//   console.log("trying")
//   axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.7398848,-73.9922758&radius=500&type=bar&key=" + `${process.env.PLACES_KEY}`)
//   .then((geoRes) => {
//     console.log(geoRes.data.results[0].name)
//   }).then(() => {
//     return next();
//   })
// })



module.exports = router;
