Non-blocking, streaming CSV parser.

# FAST
Parses about 24,700 rows per second in my rudimentary tests.

# HOW TO USE
    require 'ecsv'
    
    // Basic Parsing
    ecsv.each('myfile.csv', function(item, idx) {
      sys.puts(sys.inspect(item))
    }, null, { headers: true})

    
    // Special quote character
    ecsv.each('cands10.csv', function(item) {
      sys.puts(sys.inspect(item))
    }, finalize, { headers: true, quoteChar: '|'})


    // Headers in separate file (one header per each line)
    ecsv.each('indivs10.csv', function(item) {
      // sys.puts(sys.inspect(item))
    },  finalize, { headerFile: 'headers.txt', quoteChar: '|'})

# TODO
* Upgrade the limited test suite to use one of the newer testing frameworks.
* Look into going the EventEmitter route 

    ecsv.parse(file)
      .on('row', fn)
      .on('end', fn)