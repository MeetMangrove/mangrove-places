const passport = require('passport');
const request = require('request');
const SlackStrategy = require('passport-slack').Strategy;

// Sign in with Slack.
passport.use(new SlackStrategy({
  clientID: process.env.SLACK_KEY,
  clientSecret: process.env.SLACK_SECRET,
  callbackURL: '/auth/slack/callback',
  passReqToCallback: true
}, (req, accessToken, tokenSecret, profile, done) => {
  if (req.user) {
    User.findOne({ email: profile.user.email }, (err, user) => {
      if (err) { return done(err); }
      user.slack = profile.id;
      user.tokens.push({ kind: 'slack', accessToken, tokenSecret });
      user.profile.picture = profile.user.image_192;
      user.profile.firstName = user.profile.firstName || profile.displayName.split(' ')[0];
      user.profile.name = user.profile.name || profile.displayName.substring(user.profile.firstName.length).trim();
      user.save((err) => {
        if (err) { return done(err); }
        req.flash('info', { msg: 'Slack account has been linked.' });
        done(err, user);
      });
    });
  } else {
    User.findOne({ slack: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = new User();
      user.email = profile.user.email;
      user.slack = profile.id;
      user.tokens.push({ kind: 'slack', accessToken, tokenSecret });
      user.profile.picture = profile.user.image_192;
      user.profile.firstName = user.profile.firstName || profile.displayName.split(' ')[0];
      user.profile.name = user.profile.name || profile.displayName.substring(user.profile.firstName.length).trim();
      user.save((err) => {
        done(err, user);
      });
    });
  }
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/onboarding/step1');
};

/**
 * Login Required middleware.
 */
exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role == "admin") {
    return next();
  }
  res.redirect('/');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};