const express = require('express');
const passport = require('passport');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers')
const passportConfig = require('../config/passport');

/*
 * Controllers
 */
const homeController = require('../controllers/home');
const listingController = require('../controllers/listing');
const userController = require('../controllers/user');

/*
 * Routes
 */
router.get('/', homeController.index);
router.get('/listing/add', listingController.index);
router.get('/listings', listingController.getListings);

/*
 * User route
 */
router.get('/logout', userController.logout);
router.post('/account/delete', passportConfig.isAdmin, userController.postDeleteAccount);

/*
 * Auth
 */
router.get('/auth/slack', passport.authenticate('slack'));
router.get('/auth/slack/callback', passport.authenticate('slack', { 
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/listings');
});

/*
 * Backend dev temporary routes
 */
router.get('/dev/listings', passportConfig.isAuthenticated, listingController.getListings);
router.get('/dev/listings/:id', passportConfig.isAuthenticated, listingController.getListingById);
router.delete('/dev/listings/:id', passportConfig.isAuthenticated, catchErrors(listingController.deleteListing));

router.get('/dev/listing/add', passportConfig.isAuthenticated, listingController.addListing);
router.post('/dev/listing/add', passportConfig.isAuthenticated, catchErrors(listingController.createListing));

module.exports = router;