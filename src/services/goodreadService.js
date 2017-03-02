var http  = require('http'); // node package
var xml2Json = require('xml2js'); // we receive xml data form goodreads, this create a parser
var parser = xml2Json.Parser({explicitArray : false});

var goodreadService = function() {

    // dummy simple impl for now
    var getBookById = function(id, servCallback) {

        var options = {
            host : 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&key=IVTY8M41vCibOdDSR6MIQ' // for now hard coded id 656
        };

        var httpCallback = function(response) {
            var str = ''; // we have to package together all chnk of data that comes back

            // when on event data comeback
            response.on('data', function(chunk) {
                str += chunk;
            });
            // once done
            response.on('end', function() {
                // we now get an xml from goodreads
                parser.parseString(str, function(err, jsonDoc) {
                    if (err) {
                        console.log(err);
                    }
                    // now we have our json that we append to our service callback
                    servCallback(null, jsonDoc.GoodreadsResponse.book);
                });
            });
        };

        http.request(options, httpCallback).end();
    };

    return {
        getBookById:getBookById
    };
};

module.exports = goodreadService;