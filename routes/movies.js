var express = require('express');
var router = express.Router();
var db = require('../db');

// Get Movie List
router.get('/', function(req, res, next) {
  db('movies').whereNotExists(function() {
    this.select('*').from('watch').whereRaw('movies.id = watch.movie_id');
  }).then(movies => {
    res.json(movies);
  });
})

// Post to Movie List
router.post('/add', function(req, res, next) {
  var movie = req.body
  db('movies').insert(movie).then(() => {
    res.send('success');
  });
})

// Delete Movie from List
router.delete('/delete/:id', function(req, res, next) {
  let id = req.params.id
  db('movies').del('*').where({id}).then(() => {
    res.send('success')
  });
})

module.exports = router;
