var monteCarlo = require('../lib/monte_carlo');

suite('monte carlo', function() {
  test('rolling two fair dice', function() {
    var domain = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    function pmf(element) {
      switch (element) {
        case 2:
          return 1 / 36;
        case 3:
          return 2 / 36;
        case 4:
          return 3 / 36;
        case 5:
          return 4 / 36;
        case 6:
          return 5 / 36;
        case 7:
          return 6 / 36;
        case 8:
          return 5 / 36;
        case 9:
          return 4 / 36;
        case 10:
          return 3 / 36;
        case 11:
          return 2 / 36;
        case 12:
          return 1 / 36;
      }
    }

    var result = monteCarlo(domain, pmf, {
      aggregate: function(results) {
        var sum = results.reduce(function(a, b) {
          return a + b;
        }, 0);

        return sum / results.length;  // average
      },
      sampleSize: 100000
    });

    assert.closeTo(result, 7, 0.1 /* delta */);
  });
});
