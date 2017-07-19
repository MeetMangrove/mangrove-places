/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {

  // Redirects users to listings if he is logged in already
  if(req.user && req.user.slack){
    return res.redirect('/listings');
  }

  res.render('home', {
    title: 'Mangrove Places'
  });
};