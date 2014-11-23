var twilio = require('./twilio');

var Gpio = require('onoff').Gpio,
    buzzer = new Gpio(18, 'out'),
    probe = new Gpio(17, 'in', 'both');

probe.watch(function(err, value) {

    if (value) { // rain starts > value = 1
        // trigger the buzzer
        buzzer.writeSync(1);

        // turn off the buzzer after 2 seconds
        setTimeout(function() {
            buzzer.writeSync(0);
        }, 2000);

        console.log('Sending an SMS to Mom');
        // and SMS Mom!
        twilio.smsMom();
    }

});

function exit() {
    buzzer.unexport();
    probe.unexport();
    process.exit();
}

process.on('SIGINT', exit);

var router = require('./router')(probe);
