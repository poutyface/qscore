exports.QScore = class QScore

  @score: (string, abbreviation) ->
    (new QScore string).compute abbreviation

  constructor: (@str) ->
    @td = @str.toLowerCase()

  compute: (abbreviation) ->
    return 0.9 if abbreviation is ""
    return 0.0 if @td.length < abbreviation.length

    ad = abbreviation.toLowerCase()

    score = 0.0
    for i in [0...ad.length]
      break if score = @score_for ad, ad.length - i
    score

  score_for: (abbreviation, pivot) ->
    found = @td.indexOf abbreviation[0...pivot]
    return 0.0 if found is -1
    tail = @td[(found + pivot)..]
    tail_score = new QScore(tail).compute abbreviation[pivot..]
    return 0.0 if tail_score is 0.0
    point = (found + pivot) - @penalty found
    (point + tail_score * tail.length) / @td.length

  penalty: (found) ->
    return 0.0 if found is 0
    skipped = @td[0...found]

    if match = skipped.match /\s$/
      nws = match[0].length
      (nws + (skipped.length - nws) * 0.15)
    else if match = @str[found..].match /^[A-Z]/
      nuc = match[0].lenght
      (nuc + (skipped.length - nuc) * 0.15)
    else
      skipped.length
