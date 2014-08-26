var _ = require('lodash'),
    debug = require('debug')('calculator:monteCarlo'),
    Intervals = require('./intervals').Intervals,
    Interval = require('./intervals').Interval;

/**
 * @param {Array} domain set of input data.
 * @param {Function} pmf probability mass function.
 * @param {Function} transform function to apply to sample.
 *
 * Options:
 *
 *   - (Function) aggregate process results.
 *   - (Number) sampleSize number of samples to draw from domain.
 *   - (Function) transform transformation to apply to each element in sample.
 */
module.exports = function(domain, pmf, options) {
  var intervals = new Intervals();
  var offset = 0;
  domain.forEach(function(element) {
    debug('Insert element: ' + element);
    var probability = pmf(element);
    debug('Probability: ' + probability);
    intervals.insert(new Interval(offset, offset + probability, element));
    offset = offset + probability;
  });

  var sample = _.times(options.sampleSize, function() {
    var key = Math.random();
    return intervals.find(key);
  });

  var transform = 'transform' in options ? options.transform : _.identity;
  var results = sample.map(transform);
  if (!('aggregate' in options)) {
    return results;
  }

  return options.aggregate(results);
};
