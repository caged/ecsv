var fs = require('fs')
var assert = require('assert')
var sys = require('sys')
var ecsv = require('../lib/ecsv')

ecsv.each('fixtures/unique-seperator.csv',  function(item, idx) {
  if(idx == 1) {
    assert.equal('Justin', item['name'])
    assert.equal(29, item['age'])
  }
}, null, { headers: true, seperator:"|"})