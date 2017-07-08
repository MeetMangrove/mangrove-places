const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');
const listingController = require('../controllers/listing');

router.get('/', homeController.index);
router.get('/listing/add', listingController.index);
router.get('/listings', listingController.listings);

module.exports = router;
