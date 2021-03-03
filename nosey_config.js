var parseString = require('xml2js').parseString;
const nosey = require('./nosey_keys.json') 
const https = require('https');

// var xml = "<root>Hello xml2js!</root>"



async function test1(){
    const apiUrl= nosey.divorce_court.url;
    const opts = {
        username: nosey.username,
        password: nosey.password
    };

    
    https.get(apiUrl, (resp) => {
        let data = '';
      
        // A chunk of data has been received.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(data);
            parseString(data, function (err, result) {
                console.dir(result);
                console.log(result.rss.channel)
                console.log(result.rss.channel[0].item)
            });
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });

}

test1();
//   var headers = {
//     "Authorization" : "Basic " + Utilities.base64Encode(USERNAME + ':' + PASSWORD)
//   };

//   var params = {
//     "method":"GET",
//     "headers":headers
//   };