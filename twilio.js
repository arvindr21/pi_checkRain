var client = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');

module.exports = {
    smsMom: function() {
        client.sendMessage({
            to: '+91XXXXXXXXXX',
            from: '+16165225251', // your Twilio number
            body: 'Mommy!! Its raining..' // The body of the text message
        }, function(error, message) {
            console.log(error | message);
        });
    }
};