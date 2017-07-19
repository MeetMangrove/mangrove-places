const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slugs = require('slugs');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true
  },
  owner: {
    name: String,
    nickname: String,
    slackid: String
  },
  description: {
    type: String,
    trim: true
  },
  maxGuests: Number,
  type: String, // Either Entier home or Private room
  uri: String,
  location: {
    type: [Number],
    index: '2dsphere'
  },
  address: {
    street: String,
    zip: String,
    city: String,
    country: String
  },
  pricePerNight: {
    value: Number,
    currency: String
  },
  availability: {
    from: { type: Date, default: null },
    to: { type: Date, default: null },
    maxStay: Number
  },
  photos: [String],
  guests: [String]
});

listingSchema.pre('save', function(next) {
  // @todo make slugs unique
  this.slug = slugs(this.title);
  next();
});

module.exports = mongoose.model('Listing', listingSchema);