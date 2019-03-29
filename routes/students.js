const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const withAuth = require('../auth/middleware');
const consts = require('../utils/consts');
const config = require('../config/config');
const studentHandler = require('../utils/studentHandler');
const purchaseHandler = require('../utils/purchaseHandler');
const giftHandler = require('../utils/giftHandler');
const errHandler = require('../utils/errHandler');

// Bring in Models
let Student = require('../models/student');

// authenticate process
router.post('/authenticate', (req, res) => {

    const { code } = req.body;

    Student.findOne({ code }, function(err, student) {

        if (err) {
            errHandler(err);

        } else if (!student) {

            res.status(consts.UNAUTHORIZED_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });

        } else if (student) { // if found student


            // Match password
            // bcrypt.compare(password, student.password, (err, isMatch) => {
            //
            //     if (err) throw err;
            //
            //     if (isMatch) {

                    // Issue token
                    const payload = { code: code };
                    const token = jwt.sign(payload, config.jwtSecret, {
                        expiresIn: '5h'
                    });

                    try {
                        res.cookie('stoken', token, { httpOnly: true }).sendStatus(200);

                    } catch (e) {
                        config.log(e)
                    }

                    config.log(token);

                } else {

                    res.status(consts.UNAUTHORIZED_CODE)
                        .json({
                            error: consts.INCORRECT_PASSWORD
                        });
                }
            // });


    });

});

router.post('/checkToken', withAuth, function(req, res) {

    res.sendStatus(consts.SUCCESS_CODE);
});

router.post('/logout', (req, res)=>{
    const token = jwt.sign({username:"unknown"},"something",{expiresIn:'1s'});
    try {
        res.cookie('stoken', token, { httpOnly: true }).sendStatus(200);

    } catch (e) {
        res.status(404).send("مشکل در خروج");
    }
});



router.post('/checkCode', studentHandler.checkCode);
router.post('/register', studentHandler.register);

// router.post('/commitPurchase', withAuth, purchaseHandler.commitPurchase, studentHandler.getStudentList);
// router.post('/commitGift', withAuth, giftHandler.commitGift, studentHandler.getStudentList);
//
// router.post('/getGPList', withAuth, studentHandler.getGPList);



module.exports = router;