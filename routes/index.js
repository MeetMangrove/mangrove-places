const express = require('express');
const passport = require('passport');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')

/*
  Controllers
*/
const homeController = require('../controllers/home');
const listingController = require('../controllers/listing');

/*
  Routes
*/
router.get('/', homeController.index);
router.get('/listing/add', listingController.index);
router.get('/listings', listingController.listings);
router.get('/auth/slack', passport.authenticate('slack'));
router.get('/auth/slack/callback', passport.authenticate('slack', { 
  failureRedirect: '/onboarding/step1'
}), (req, res) => {
  res.redirect('/onboarding/step2');
});

/*
  Backend dev temporary routes
*/
router.get('/dev/listings', listingController.getListings);
router.get('/dev/listing/add', listingController.addListing);
router.post('/dev/listing/add', catchErrors(listingController.createListing));

module.exports = router;