var express = require('express');
var router = express.Router();
const apiHelpers = require('../apiCalls/api-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});
// router.patch('/', apiHelpers.getPlaces, (req,res) => {
//   console.log("router", req.body.lat)
//   res.status(200).send({
//     latitude: req.body.lat,
//     longitude: req.body.lng
//   })
// });

module.exports = router;
