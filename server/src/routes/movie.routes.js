const express = require('express');
const {
  search,
  popular,
  topRated,
  upcoming,
  byGenre,
  genres,
  details,
  trailer,
} = require('../controllers/movie.controller');

const router = express.Router();

router.get('/search', search);
router.get('/popular', popular);
router.get('/top-rated', topRated);
router.get('/upcoming', upcoming);
router.get('/genres', genres);
router.get('/genre/:genreId', byGenre);
router.get('/:tmdbId/trailer', trailer);
router.get('/:tmdbId', details);

module.exports = router;
