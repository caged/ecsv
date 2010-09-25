var fs = require('fs')
var sys = require('sys')

/**
 * Non-blocking parsing of a CSV file
 * @param {string} The location of the csv file to parse
 * @param {function} The callback to invoke once a row has been parsed
 * @param {function} The callback to invoke once all the iterations are complete
 * @param {object} opts The options to use when parsing
 *  * <tt>headers</tt> - Whether or not the headers are the first row of the CSV file
 *  * <tt>headerFile</tt> - A seperate file containing the headers (one per row)
 *  * <tt>seperator</tt> - The character used to seperate values.  Defaults to ","
 *  * <tt>quoteChar</tt> - The character used to quote strings.  Defaults to """
 *  * <tt>crlf</tt> - The line break style.  Defaults to "\n"
 *
 *  Original RegExp adapted from http://bit.ly/cRSWq1
 */     
exports.each = function(file, callback, finalize, opts) {
  var options = (opts || {}),
      headers = [],
      headerFile = options.headerFile,
      sep = escapedSeperator(options.seperator),
      qchar = (options.quoteChar || '"'),
      crlf = (options.crlf || "\n"),
      pattern = new RegExp(
                  sep + '(?=(?:[^\\' + qchar + ']*\\' + 
                  qchar + '[^\\' + qchar + ']*\\' + 
                  qchar + ')*(?![^\\' + qchar + ']*\\' + 
                  qchar + '))', 
                'g'),
      quoted = new RegExp('^\\' + qchar + '|\\' + qchar + '$', 'g'),
      buffer = "",
      iter = 0,
      rows = 0

  if(headerFile) {
    fs.readFile(headerFile, 'utf8', function(err, str) {
      headers = str.split('\n').map(function(hdr) {
        return hdr.replace(quoted, '')
      })
    })
  }
  parse()
  
  function parse() {
    var stream = fs.createReadStream(file)
    stream.setEncoding('utf8')
    stream.addListener('data', function(data) {
      buffer += data
      var lines = buffer.split(crlf)
    
      lines.forEach(function(item, index) {      
        if(index == lines.length - 1) return
        if(iter++ == 0 && index == 0 && options.headers) {
          item = item.replace(/\r+/, '')
          headers = item.split(pattern).map(function(hdr) {
            return hdr.replace(quoted, '')
          })          
        } else {
          var obj;
          item = item.replace(/\r+$/, '')
          item.split(pattern).forEach(function(str, i) {
            str = str.replace(quoted, '')
          
            if(headers.length > 0) {
              if(!obj) obj = {}
              obj[headers[i]] = str
            } else {
              if(!obj) obj = []
              obj.push(str)
            }
          })
          
          callback(obj, (!options.headers ? iter : iter - 1))
        }
      })

      buffer = lines[lines.length - 1]
      rows += lines.length - 1;
    })
  
    stream.addListener('close', function() {
      if(!options.headers) rows += 1
      if(finalize) finalize(rows)
    })
  }
  
  function escapedSeperator(sep) {
    if(!sep) return ','
    
    var needEscape = ['|', "\t"],
        ret = sep
        
    needEscape.forEach(function(esep) {
      if(esep == sep) {
        ret = '\\' + sep
      }
    })
    
    return ret 
  }
}