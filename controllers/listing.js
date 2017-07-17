const mongoose = require('mongoose');
const Listing = mongoose.model('Listing');

/**
 * GET /
 * Listing Add page.
 */
exports.index = (req, res) => {
  // if(req.user && req.user.slack){
  //   return res.redirect('/onboarding/step2');
  // }

  res.render('listing-add', {
    title: 'Mangrove Places - Add Listing'
  });
};

exports.listings = (req, res) => {
  // if(req.user && req.user.slack){
  //   return res.redirect('/onboarding/step2');
  // }

  res.render('listing', {
    title: 'Mangrove Places - Homepage'
  });
};

exports.addListing = (req, res) => {
  res.render('listing-edit', {
    title: 'Add a new listing'
  });
};

exports.createListing = async (req, res) => {
  const listing = new Listing(req.body);
  await listing.save()
  // req.flash('success', 'Successfully created new listing ${listing.name}')

  console.log('Listing saved!');
  console.log(req.body);
  res.redirect('/listings');
};

exports.getListings = (req, res) => {
  res.render('layout-listing-list', { title: "Mangrove Places - Listings" })
};