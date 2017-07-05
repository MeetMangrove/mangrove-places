/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  // if(req.user && req.user.slack){
  //   return res.redirect('/onboarding/step2');
  // }

  res.render('home', {
    title: 'Mangrove Places'
  });
};