var Interval = require('../lib/intervals').Interval,
    Intervals = require('../lib/intervals').Intervals;

suite('Intervals', function() {
  var subject, a, b, c, d, e, f, g, h, i;

  setup(function() {
    a = new Interval(0, 0.1, 'a');
    subject = new Intervals(a);

    b = new Interval(0.1, 0.2, 'b');
    subject.insert(b);
    c = new Interval(0.2, 0.3, 'c');
    subject.insert(c);
    d = new Interval(0.3, 0.4, 'd');
    subject.insert(d);
    e = new Interval(0.4, 0.5, 'e');
    subject.insert(e);
    f = new Interval(0.5, 0.6, 'f');
    subject.insert(f);
    g = new Interval(0.6, 0.7, 'g');
    subject.insert(g);
    h = new Interval(0.7, 0.8, 'h');
    subject.insert(h);
    i = new Interval(0.8, 0.9, 'i');
    subject.insert(i);
    j = new Interval(0.9, 1, 'j');
    subject.insert(j);
  });

  test('#find', function() {
    assert.deepEqual(subject.find(0), 'a');
    assert.deepEqual(subject.find(0.15), 'b');
    assert.deepEqual(subject.find(0.27), 'c');
    assert.deepEqual(subject.find(0.31), 'd');
    assert.deepEqual(subject.find(0.49), 'e');
    assert.deepEqual(subject.find(0.54), 'f');
    assert.deepEqual(subject.find(0.66), 'g');
    assert.deepEqual(subject.find(0.72), 'h');
    assert.deepEqual(subject.find(0.83), 'i');
    assert.deepEqual(subject.find(0.98), 'j');
  });
});
