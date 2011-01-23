var QScore;
exports.QScore = QScore = (function() {
  QScore.score = function(string, abbreviation) {
    return (new QScore(string)).compute(abbreviation);
  };
  function QScore(str) {
    this.str = str;
    this.td = this.str.toLowerCase();
  }
  QScore.prototype.compute = function(abbreviation) {
    var ad, i, score, _ref;
    if (abbreviation === "") {
      return 0.9;
    }
    if (this.td.length < abbreviation.length) {
      return 0.0;
    }
    ad = abbreviation.toLowerCase();
    score = 0.0;
    for (i = 0, _ref = ad.length; (0 <= _ref ? i < _ref : i > _ref); (0 <= _ref ? i += 1 : i -= 1)) {
      if (score = this.score_for(ad, ad.length - i)) {
        break;
      }
    }
    return score;
  };
  QScore.prototype.score_for = function(abbreviation, pivot) {
    var found, point, tail, tail_score;
    found = this.td.indexOf(abbreviation.slice(0, pivot));
    if (found === -1) {
      return 0.0;
    }
    tail = this.td.slice(found + pivot);
    tail_score = new QScore(tail).compute(abbreviation.slice(pivot));
    if (tail_score === 0.0) {
      return 0.0;
    }
    point = (found + pivot) - this.penalty(found);
    return (point + tail_score * tail.length) / this.td.length;
  };
  QScore.prototype.penalty = function(found) {
    var match, nuc, nws, skipped;
    if (found === 0) {
      return 0.0;
    }
    skipped = this.td.slice(0, found);
    if (match = skipped.match(/\s$/)) {
      nws = match[0].length;
      return nws + (skipped.length - nws) * 0.15;
    } else if (match = this.str.slice(found).match(/^[A-Z]/)) {
      nuc = match[0].lenght;
      return nuc + (skipped.length - nuc) * 0.15;
    } else {
      return skipped.length;
    }
  };
  return QScore;
})();