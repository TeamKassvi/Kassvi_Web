var fs = require("fs");
var request = require("request");
var rp = require('request-promise');

var options = { method: 'POST',
  url: 'http://g711.org/submit/',
  headers:
   {
     // 'Postman-Token': '53a0c623-df97-9ad2-d0c2-38c9b9d73c03',
     'Cache-Control': 'no-cache',
     'Content-Type': 'application/x-www-form-urlencoded',
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  formData:
   { userfile:
      { value: 'fs.createReadStream("D:\\music\\02 Send My Love (To Your New Lover).m4a")',
        options:
         { filename: 'D:\\music\\02 Send My Love (To Your New Lover).m4a',
           contentType: null } },
     platform: 'asterisk',
     volume: '20',
     bandpass: '1' } };

rp(options)
.then((error, response, body) => {
  if (error) console.log('error');
  console.log(response);
  console.log(body);
});
