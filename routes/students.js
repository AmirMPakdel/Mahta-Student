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

const secret = 'mysecretboozboozak';

// Bring in Models
let User = require('../models/user');
let Student = require('../models/student');

// authenticate process
router.post('/authenticate', (req, res) => {

    const { username, password } = req.body;

    User.findOne({ username }, function(err, user) {

        if (err) {

            config.error(err);
            res.status(consts.INT_ERR_CODE)
                .json({
                    error: consts.ERR
                });
        } else if (!user) {

            res.status(consts.UNAUTHORIZED_CODE)
                .json({
                    error: consts.INCORRECT_USER
                });
        } else {

            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {

                if (err) throw err;

                if (isMatch) {

                    // Issue token
                    const payload = { username: username };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '5h'
                    });

                    try {
                        res.cookie('token', token, { httpOnly: true }).sendStatus(200);

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
            });

        }
    });

});


router.post('/logout', (req, res)=>{
    const token = jwt.sign({username:"unknown"},"something",{expiresIn:'1s'});
    try {
        res.cookie('token', token, { httpOnly: true }).sendStatus(200);

    } catch (e) {
        res.status(404).send("مشکل در خروج");
    }
});

router.post('/checkToken', withAuth, function(req, res) {

    res.sendStatus(consts.SUCCESS_CODE);
});

router.post('/getStudentList', withAuth, studentHandler.getStudentList);
router.post('/addStudent', withAuth, studentHandler.addStudent);
router.post('/editStudent', withAuth, studentHandler.editStudent);
router.post('/deleteStudent', withAuth, studentHandler.deleteStudent);

router.post('/commitPurchase', withAuth, purchaseHandler.commitPurchase, studentHandler.getStudentList);
router.post('/commitGift', withAuth, giftHandler.commitGift, studentHandler.getStudentList);

router.post('/getGPList', withAuth, studentHandler.getGPList);

router.post('/spendCredit', withAuth, studentHandler.spendCredit);

router.post('/groupCommit', withAuth, studentHandler.groupCommit);







module.exports = router;