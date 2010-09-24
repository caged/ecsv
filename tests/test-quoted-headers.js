var fs = require('fs')
var assert = require('assert')
var sys = require('sys')
var ecsv = require('../lib/ecsv')

// TODO: Find a better way to test node scripts

var headers = []

ecsv.each('fixtures/quoted-headers.csv',  function(item, idx) {
  if(idx == 1) {
    for(var key in item)
      headers.push(key)

    assert.equal(headers.length, 8)
    assert.equal(item['State'], 'Alabama')
    assert.equal(item['Total (km)'], 80.36)
    assert.equal(item['Available % of State'], '0.017686450652558%')
  }
}, 

function(rows) {
  assert.equal(rows, 49)
}, { headers: true})