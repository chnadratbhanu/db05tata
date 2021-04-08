var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mango', { title: 'Search Results mangoes' });
});

module.exports = router;