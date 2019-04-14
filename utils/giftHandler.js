const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');
const config = require('../config/config');

// Requiring models
let Student = require('../models/student');
let Gift = require('../models/gift');


async function getGifts(ownerId, response) {

    let issue = false;

    let query = {
       owner: ownerId
    };

    await Gift.find(query, {_id: 0, __v: 0, owner: 0}, function (err, gifts) {

        if (err) {
            issue = true;
            errHandler(err, res);
        } else {

            config.log('gifts: ');
            config.log(gifts);

            // only way to change sent argument to a function in js is this: :)
            response.gifts = gifts;
        }
    });

}

module.exports = {getGifts};


