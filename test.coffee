{QScore} = require "./qscore"

p = console.log

p QScore.score("hello", "h")
p QScore.score("hello", "he")
p QScore.score("hello", "hel")
p QScore.score("hello", "helo")
p QScore.score("hello", "hello")
p QScore.score("hello", "llo")
p QScore.score("hello", "lo")
p QScore.score("hello", "ho")
p QScore.score("hello", "hx")
p QScore.score(" hello", "hello")
p QScore.score(" hello ", "hello")
p QScore.score("HELLO", "hello")
p QScore.score("HELLO", "HELLO")
p QScore.score("HELLO WORLD", "HW")