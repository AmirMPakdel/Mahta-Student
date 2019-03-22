const mongoose = require('mongoose');
const consts = require('./consts');
const errHandler = require('./errHandler');
const config = require('../config/config');

// Requiring models
let Student = require('../models/student');
let Gift = require('../models/gift');


async function commitGift(req, res, next) {

    let params = req.body;
    let issue = false;

    let gift = new Gift({});
    let inviterId;

    // find student
    await Student.findOne({ code: params.code }, function(err, student) {

        if (err) {
            errHandler(err, res);

        } else if (!student) { // if no student found

            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });

        } else { // if student was found

            // creating gift
            gift._id = new mongoose.Types.ObjectId();
            gift.owner = student._id;
            gift.price = params.price;
            gift.info = params.info;

            // updating student
            student.gifts.push(gift);
            student.gift += gift.price;


            // save student
            student.save((err => {
                if (err) {
                    errHandler(err, res);
                    config.log(`err in saving student`);
                }

            }));

            // save purchase
            gift.save((err => {
                if (err) {
                    errHandler(err, res);
                    config.log(`err in saving gift`);
                }
            }));
        }
    });

    if (issue) return;

    next();
}

async function deleteGifts(ownerId) {

    await Gift.deleteMany({ owner: ownerId }, function(err, info) {

        if (err) {
            errHandler(err, res);

        } else {
            config.log(`deleted ${info.n} gifts`);
        }
    }).catch(err => {
        config.log(err)
    });
}

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

module.exports = {commitGift, deleteGifts, getGifts};


