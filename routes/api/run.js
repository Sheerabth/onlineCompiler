const express = require('express');
const router = express.Router();

// @route   GET api/compile
// @desc    Compile A File
// @access  Public
router.post('/', function (req, res) {

    res.setHeader('Content-Type', 'application/json');

    var request = require('request');

    var lang;
    switch (req.body.mode) {
        case "python": lang = "python3";
            break;
        case "golang": lang = "go";
            break;
        default: lang = req.body.mode;
            break;
    }

    var program = {
        script: req.body.value,
        language: lang,
        versionIndex: "2",
        stdin: req.body.input,
        clientId: "302da1ffb5a05411fb5ed037582b4437",
        clientSecret: "8d2e46ad0eaf64c214018eb16ebb129911167758297f13ec04d46971982a4868"
    };
    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    },
        function (error, response, body) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            res.send(JSON.stringify(body.output));
        });
});

module.exports = router