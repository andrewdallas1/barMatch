var express = require('express');
var router = express.Router();
var models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');
const apiHelpers = require('../apiCalls/api-helpers');

const axios = require('axios');

require('dotenv').config();

/* GET users listing. */
router.get('/', authHelpers.loginRequired, apiHelpers.getLocation, (req, res, next) => {
  console.log('places ======>' + req.user.id);
  res.render('user/index', {
    user: req.user.dataValues,
    places: res.locals.places,
    locations: res.locals.locations,
    map: apiHelpers.initMap
  });

});

router.post('/', function(req, res, next) {
  console.log(req.body.user_id)
  models.User_Bars.create({
    user_id: req.body.user_id,
    bar_name: req.body.bar_name,
    bar_address: req.body.bar_address
  }).then(function() {
    res.redirect('/user');
  });
});

router.get('/faves', function(req, res, next) {
  console.log(req.user.id)
  models.User_Bars.findAll({
    where: {
      user_id: req.user.id
    }
  }).then(function(user_bars) {
    console.log(user_bars)
    res.render('user/faves', {
    user_bars: user_bars
    })
  })
})



module.exports = router;
