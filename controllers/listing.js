const mongoose = require('mongoose');
const Listing = mongoose.model('Listing');
const flash = require('express-flash');

/**
 * GET /
 * Listing Add page.
 */
exports.index = (req, res) => {
  // if(req.user && req.user.slack){
  //   return res.redirect('/onboarding/step2');
  // }

  res.render('listing-add', {
    title: 'Add Listing'
  });
};

exports.listings = (req, res) => {
  // if(req.user && req.user.slack){
  //   return res.redirect('/onboarding/step2');
  // }

  res.render('listing', {
    title: 'Homepage'
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
  req.flash('success', 'Successfully created new listing ${listing.name}');

  console.log('Listing saved!');
  console.log(req.body);
  res.redirect('/listings');
};

exports.getListings = async (req, res) => {
  const listings = await Listing.find();
  console.log(listings);
  res.render('listing', { title: "Listings", listings })
};

exports.getListingById = async (req, res) => {

  const listing = await Listing.findById(req.params.id);
  console.log(listing);
  res.render('listing-detail', { title: "Listing", listing })
};