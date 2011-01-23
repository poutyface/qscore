{exec} = require('child_process')

task 'build', 'Build project from coffee to js', ->
  exec 'coffee -b -c *.coffee', (err, stdout, stderr) ->
    throw err if err

task 'test', 'Run test', ->
  exec 'node test.js', (err, stdout, stderr) ->
    throw err if err
    console.log stdout