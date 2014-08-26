var debug = require('debug')('calculator:Intervals');

function Intervals(interval) {
  if (interval instanceof Interval) {
    debug('Set interval data.');
    this.initialize(interval);
  }
}
exports.Intervals = Intervals;

Intervals.prototype = {
  initialize: function(interval) {
    this.key = interval.start;
    debug('First interval key: ' + this.key);
    this.interval = interval;
    this.value = interval.value;
    this.left = null;
    this.right = null;
  },

  find: function(key) {
    debug('Find key: ' + key);
    if (belongsToInterval(key, this.interval)) {
      debug('Found key.');
      return this.value;
    }

    if (key < this.key) {
      debug('Look left.');
      return this.left.find(key);
    }

    debug('Look right.');
    return this.right.find(key);
  },

  insert: function(interval) {
    debug('Insert key: ' + interval.start);
    if (isLeaf(this)) {
      debug('Found insert location.');
      if (typeof this.key !== 'number') {
        debug('Initialize root with interval data.');
        this.initialize(interval);
      } else if (interval.start > this.key) {
        this.right = new Intervals(interval);
      } else {
        this.left = new Intervals(interval);
      }

      return;
    }

    if (interval.start > this.key) {
      debug('Insert to left.');
      return this.right.insert(interval);
    }

    debug('Insert to right.');
    return this.left.insert(interval);
  }
};

function belongsToInterval(key, interval) {
  return key >= interval.start && key <= interval.end;
}

function isLeaf(intervals) {
  return (!(intervals.left instanceof Intervals)) &&
         (!(intervals.right instanceof Intervals));
}

function Interval(start, end, value) {
  this.start = start;
  this.end = end;
  this.value = value;
}
exports.Interval = Interval;
