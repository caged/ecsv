var fs = require('fs')
var assert = require('assert')
var sys = require('sys')
var ecsv = require('../lib/ecsv')

// TODO: Find a better way to test node scripts

var headers = []

ecsv.each('fixtures/embedded-commas.csv',  function(item, idx) {
  if(idx == 1) {
    assert.equal('This, is great', item[0])
    assert.equal('some other thing', item[1])
    
  }
}, 

function(rows) {
  assert.equal(rows, 2)
})