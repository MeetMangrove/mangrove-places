const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');


// Do work here
// router.get('/', (req, res) => {
//   res.send('Hey! It works!');
// });
router.get('/', homeController.index);

module.exports = router;
