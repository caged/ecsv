var sys  = require('sys')
var ecsv = require('../lib/ecsv')

var start = new Date();
var finalize = function(rows) {
    var str = ((new Date).getTime() - start) + ' milliseconds'
    sys.puts('Parsed ' + rows + ' rows in ' + str)
}

// ecsv.each('/Users/justin/Downloads/chicago.csv', function(item, idx) {
//   sys.puts(idx)
//   // sys.puts(sys.inspect(item))
// }, null, { headers: true})


// ecsv.each('/Users/justin/Downloads/07-06-10/CampaignFin10/cands10.csv', function(item) {
//   sys.puts(sys.inspect(item))
// }, finalize, { headers: true, quoteChar: '|'})


//HUGE FILE 1,000,000+ rows
ecsv.each('/Users/justin/Downloads/07-06-10/CampaignFin10/indivs10.csv', function(item) {
  // sys.puts(sys.inspect(item))
},  finalize, { headerFile: 'headers.txt', quoteChar: '|'})

