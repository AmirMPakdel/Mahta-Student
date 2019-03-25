const consts = require('./consts');
const errHandler = require('./errHandler');
const giftHandler = require('./giftHandler');
const purchaseHandler = require('./purchaseHandler');
const config = require('../config/config');
const validator = require('../tools/validator');
const dateConverter = require('../tools/dateConverter');

// Requiring models
let Student = require('../models/student');


/*
* checking temporary code
* */
async function checkCode(req, res, next) {

    let params = req.body;

    let issue = validator.hasCode(req, res, params);
    if (issue) return;

    let query = {
        code: params.code
    };

    await Student.findOne(query, function(err, student) {

        if (err) {
            errHandler(err, res);

        } else if (student) { // if a student was found

            if (!student.firstName && !student.lastName) { // if student wasn't registered before

                res.sendStatus(consts.SUCCESS_CODE);

            } else { // if student was registered before

                res.status(consts.BAD_REQ_CODE)
                    .json({
                        error: consts.STUDENT_ALREADY_REGISTERED
                    });
            }
        } else { // if found no student

            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        }

    });

}

/*
* registering student
* */
async function register(req, res, next) {

    let params = req.body;

    let issue = validator.hasCode(req, res, params);
    if (issue) return;

    let query = {
        code: params.code
    };

    let studentToRegister;

    await Student.findOne(query, function(err, student) {

        if (err) {
            errHandler(err, res);

        } else if (student) { // if a student was found

            if (!student.firstName && !student.lastName) { // if student wasn't registered before

                config.log(`student wasn't registered`);

                student.firstName = params.firstName;
                student.lastName = params.lastName;
                student.field = params.field;
                student.grade = params.grade;
                student.school = params.school;
                student.phone = params.phone;
                student.home = params.home;
                student.password = params.password;

                studentToRegister = student;

            } else { // if student was registered before

                res.status(consts.BAD_REQ_CODE)
                    .json({
                        error: consts.STUDENT_ALREADY_REGISTERED
                    });
            }
        }

    });

    // creating main code
    studentToRegister.code = await createCode(studentToRegister.grade);

    studentToRegister.save((err => {
        config.log(`in save student & student.code is ${studentToRegister.code}`);
        if (err) {
            issue = true;
            errHandler(err, res);
        } else {
            res.status(consts.SUCCESS_CODE).json(studentToRegister);
        }
    }));


}

async function createCode(grade) {
    config.log(`in create code`);
    let date = dateConverter.getLiveDate();

    let konkurYear = Number(date.substring(0, 4));

    let isFirst3Month = date.substring(5, 7) <= 3;

    switch (grade) {

        case 'دوازدهم':
            if (isFirst3Month) {}
            else konkurYear += 1;
            break;

        case 'یازدهم':
            if (isFirst3Month) konkurYear += 1;
            else konkurYear += 2;
            break;

        case 'دهم':
            if (isFirst3Month) konkurYear += 2;
            else konkurYear += 3;
            break;

        case 'نهم':
            if (isFirst3Month) konkurYear += 3;
            else konkurYear += 4;
            break;

        case 'هشتم':
            if (isFirst3Month) konkurYear += 4;
            else konkurYear += 5;
            break;

        case 'هفتم':
            if (isFirst3Month) konkurYear += 5;
            else konkurYear += 6;
            break;

        case 'ششم':
            if (isFirst3Month) konkurYear += 6;
            else konkurYear += 7;
            break;
    }

    config.log(`konkurYear : ${konkurYear}`);

    let latestCode = 0;

    let issue = false;

    // latest added student that its code contains konkurYear
    await Student.findOne({ "code": { "$regex": konkurYear, "$options": "i" } }, { code:1, _id:0 }, { sort: { 'created' : -1 } },
        function(err, student) {

        config.log(`finding latest added student`);

        if (err) {
            issue = true;
            errHandler(err);

        } else if (student) { // if found student
            latestCode = Number(student.code);

        } else { // if found no student was found -> handling first student with chosen grade
            latestCode = konkurYear + 1000;
        }
    });

    if (issue) return;

    return (latestCode + 1.0); // for fuck sake
}

async function editStudent(req, res, next) {

    let params = req.body;
    let issue = false;

    let query = {
        code: params.code
    };

    let student = {
        firstName: params.firstName,
        lastName: params.lastName,
        grade: params.grade,
        field: params.field,
        phone: params.phone,
        home: params.home,
        school: params.school
    };

    await Student.findOneAndUpdate(query, student, {upsert:false}, function(err, student){

        if (err) {
            issue = true;
            errHandler(err, res);

        } else if (!student) {

            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        }
    });

    if (issue) return;

    // send student list
    checkCode(req, res, next);

}

async function deleteStudent(req, res, next) {

    let params = req.body;

    let issue = validator.hasCode(req, res, params);
    if (issue) return;

    let inviterId;
    let gifts;
    let purchases;

    let query = { // must cast this shit to Number
        code: Number(params.code)
    };

    config.log(`code type of: ${typeof (query.code)}`);

    // find student to get inviterId
    let studentToDelete = await Student.findOne(query, function(err, student) {

        if (err) { // if there were errors running query

            issue = true;
            errHandler(err, res);

        } else if (!student) { // if found no student

            issue = true;
            res.status(consts.BAD_REQ_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });

        } else { // if found student

            // check if had inviter
            if (student.inviter)    inviterId = student.inviter;
            // check if had gifts
            if (student.gifts.length !== 0)    gifts = student.gifts;
            // check if had purchases
            if (student.purchases.length !== 0)    purchases = student.purchases;
        }
    });

    if (issue) return;

    // if student had inviter
    if (inviterId) {

        // find inviter
        await Student.findOne({_id:inviterId}, function(err, student) {

            if (err) {

                issue = true;
                errHandler(err, res);

            } else if (!student) { // if found no inviter

                config.log(`Could not find student's inviter`)

            } else { // if found inviter, delete id from inviteds array

                for( let i = 0; i < student.inviteds.length; i++){

                    if (student.inviteds[i].equals(studentToDelete._id))
                        student.inviteds.splice(i, 1);
                }

                // saving inviter
                student.save(err => {
                    if (err) {

                        issue = true;
                        errHandler(err);

                    } else {
                        config.log(`inviter's property updated`);
                    }
                })
            }
        });
    }

    if (issue) return;

    // if student had gifts
    if (gifts) {
        await giftHandler.deleteGifts(studentToDelete._id);
    }

    // if student had purchases
    if (purchases) {
        await purchaseHandler.deletePurchases(studentToDelete._id);
    }

    if (issue) return;

    // remove student
    await Student.deleteOne(studentToDelete ,(err, student) => {

        if (err) {

            issue = true;
            errHandler(err, res);

        } else {
            config.log(`Removed student`);
        }
    });

    if (issue) return;

    // send student list
    checkCode(req, res, next);

}

async function getGPList(req, res, next) {

    let params = req.body;
    let issue = false;
    let gifts;
    let purchases;

    let studentId;

    let response = {
        gifts : [],
        purchases : []
    };

    query = {
        code: params.code
    };

    await Student.findOne(query, function(err, student) {

        if (err) {
            issue = true;
            errHandler(err, res);

        } else if (!student) { // if found no student

            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        } else { // if found student

            gifts = student.gifts;
            purchases = student.purchases;
            studentId = student._id;
        }
    });

    if (issue) return;


    // if student had gifts
    if (gifts) {
        await giftHandler.getGifts(studentId, response);
    }

    // if student had purchases
    if (purchases) {
        await purchaseHandler.getPurchases(studentId, response);
    }

    res.status(consts.SUCCESS_CODE)
        .json(response);

}

async function spendCredit(req, res, next) {

    let params = req.body;
    let issue = validator.validateSpendCredit(req, res, params);

    query = {
        code: params.code,
    };

    await Student.findOne(query, function(err, student) {

        if (err) {
            issue = true;
            errHandler(err, res);

        } else if (!student) { // if found no student

            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        } else { // if found student

            if (params.useFrom === 'credit') {

                student.credit = student.credit - params.price;

                // if student's credit was not enough
                if (student.credit <= 0) {
                    issue = true;
                    res.status(consts.BAD_REQ_CODE)
                        .json({
                            error: consts.CREDIT_NOT_ENOUGH
                        });
                }
            }

            if (params.useFrom === 'gift') {

                student.gift = student.gift - params.price;

                // if student's credit was not enough
                if (student.gift <= 0) {
                    issue = true;
                    res.status(consts.BAD_REQ_CODE)
                        .json({
                            error: consts.GIFT_NOT_ENOUGH
                        });
                }
            }

            student.save((err => {

                if (err) {
                    issue = true;
                    errHandler(err, res);
                }
            }));

        }
    });

    if (issue) return;

    // send student list
    checkCode(req, res, next);

}

// TODO: create a number of students with random code
// check if codes are not repeated
async  function groupCommit(req, res, next) {

    let params = req.body;
    let issue = false;

    let studentId;

    let response = {
        gifts : [],
        purchases : []
    };

    query = {
        code: params.code
    };

    await Student.findOne(query, function(err, student) {

        if (err) {
            issue = true;
            errHandler(err, res);

        } else if (!student) { // if found no student

            issue = true;
            res.status(consts.NOT_FOUND_CODE)
                .json({
                    error: consts.INCORRECT_MAHTA_ID
                });
        } else { // if found student

            gifts = student.gifts;
            purchases = student.purchases;
            studentId = student._id;
        }
    });

    if (issue) return;


    res.status(consts.SUCCESS_CODE)
        .json(response);

}



module.exports = {getStudentList: checkCode, addStudent: register, editStudent, deleteStudent, getGPList, spendCredit, groupCommit};
