var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sender(); 데이터를 던져줌
  res.render('index', { page: './sub/main.ejs' });
});

module.exports = router;
