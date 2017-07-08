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