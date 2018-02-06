// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.Client("72798e13-2e82-49d7-9b1d-cd743e45e520");

client.sendEmail({
  "From": "parikshit_bt2k16@dtu.ac.in",
  "To": "parikshit_bt2k16@dtu.ac.in",
  "Subject": "Test",
  "TextBody": "Hello from Postmark!"
});
