const partners = require('./data/partners');
const promotions = require('./data/promotions');
const products = require('./data/products');
const comments = require('./data/comments');
const favorites = require('./data/favorites');

module.exports = () => {
  return {
    partners,
    promotions,
    products,
    comments,
    favorites
  }
}
