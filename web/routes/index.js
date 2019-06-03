var express = require('express');
var router = express.Router();


const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://user:pass@0.0.0.0:5432');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cover', { title: 'Innovation Tokens' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Innovation Tokens' })
})

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Innovation Tokens' })
})

router.get('/about', function(req, res, next) {
  res.render('about.pug')
})

router.post('/submit', function (req, res, next) {
  console.log('post caught.')
  sequelize
})

module.exports = router;
