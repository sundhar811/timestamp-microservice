// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// timestamp microservice
// '?' at the end of ':datestring' means datestring is optional
app.get('/api/timestamp/:datestring?', (req, res) => {
  let { params: { datestring } } = req;
  if (datestring) {
    datestring = datestring.split('-');
    datestring = datestring.length === 1 ? Number(datestring.join()) : datestring.join('-');
    let utc = new Date(datestring);
    let response = utc === 'Invalid Date' ? { error: utc } : { unix: datestring, utc: utc.toUTCString() };
    res.send(response);  
  }
  else {
    let date = new Date;
    res.send({ unix: date.getTime(), utc: date.toUTCString() })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});