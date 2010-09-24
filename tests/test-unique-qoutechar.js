var fs = require('fs')
var assert = require('assert')
var sys = require('sys')
var ecsv = require('../lib/ecsv')

ecsv.each('fixtures/unique-quote-char.csv', function(item, idx) {
  if(idx == 1) {
    assert.equal(item['Cycle'], 2010)
    assert.equal(item['FECCandID'], 'H0AK00089')
    assert.equal(item['FirstLastP'], 'Harry Crawford (D)')
    assert.equal(item['CurrCand'], 'Y')
  }
}, null, { headers: true, quoteChar: '|'})