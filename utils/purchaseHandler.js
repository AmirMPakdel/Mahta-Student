const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');
const config = require('../config/config');

// Requiring models
let Student = require('../models/student');
let Purchase = require('../models/purchase');


async function getPurchases(ownerId, response) {

    let issue = false;

    let query = {
        owner: ownerId
    };

    await Purchase.find(query, {_id: 0, __v: 0, owner: 0}, function (err, purchases) {

        if (err) {
            issue = true;
            errHandler(err, res);
        } else {

            config.log('purchases: ');
            config.log(purchases);


            // only way to change sent argument to a function in js is this: :)
            response.purchases = purchases;
        }
    });

}

module.exports = {getPurchases};


