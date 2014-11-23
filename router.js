var router = require('tiny-router');
var fs = require('fs');
var twilio = require('twilio');


module.exports = function(probe) {
    router.addMimeType({
        ext: '.svg',
        mime: 'image/svg+xml'
    });

    router.use('static', {
        path: __dirname + '/public'
    });

    router.get('/status', function(req, res) {
        var status = probe.readSync();
        res.send({
            status: status
        });
    });

    router.get('/', function(req, res) {
        fs.readFile('./index.html', 'utf8', function(err, contents) {
            if (err) {
                return console.log(err);
            }
            res.send(contents);
        });
    });

    router.listen(2000);
    console.log('Application listening @ http://192.168.2.2:2000')
    return router;
}
